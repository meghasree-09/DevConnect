import "./ProjectChat.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import { useAuth } from "../../context/AuthContext";
import {
  getProjectMessages,
  sendMessage,
} from "../../api/messageApi";

const socket = io("http://localhost:8000");

function ProjectChat() {
  const { projectId } = useParams();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadMessages();

    socket.emit("joinProject", projectId);

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [projectId]);

  async function loadMessages() {
    try {
      const data = await getProjectMessages(projectId);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSend() {

  if (!user) {
    alert("Please login again.");
    return;
  }

  if (!message.trim()) return;

  const messageData = {
    projectId,
    sender: user._id,
    message,
  };

  try {

    const savedMessage =
      await sendMessage(messageData);

    socket.emit("sendMessage", savedMessage);

    setMessage("");

  } catch (error) {

    console.log(error);

  }
}

  return (
  <div className="chat-page">

    <h1 className="chat-title">
      Project Chat
    </h1>

    <div className="chat-container">

      <div className="chat-header">
        💬 Team Chat
      </div>

      <div className="chat-box">

        {messages.length === 0 ? (

          <div className="empty-chat">
            No messages yet.
            <br />
            Start the conversation!
          </div>

        ) : (

          messages.map((msg) => (

            <div
              key={msg._id}
              className={
                msg.sender?._id === user._id
                  ? "message my-message"
                  : "message other-message"
              }
            >

              <span className="sender-name">
                {msg.sender?.userName}
              </span>

              <div className="message-text">
                {msg.message}
              </div>

              <span className="message-time">
                {new Date(
                  msg.createdAt
                ).toLocaleTimeString()}
              </span>

            </div>

          ))

        )}

      </div>

      <div className="chat-input-area">

        <input
          className="chat-input"
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button
          className="send-btn"
          onClick={handleSend}
        >
          Send
        </button>

      </div>

    </div>

  </div>
);
}

export default ProjectChat;