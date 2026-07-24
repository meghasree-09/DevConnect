import "./ChatBox.css";

import { useEffect, useRef, useState } from "react";

import { getMessages, sendMessage } from "../../api/chatapi";
import { useAuth } from "../../context/AuthContext";

import Message from "./Message";

function ChatBox({ communityId }) {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, [communityId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const fetchMessages = async () => {
    try {
      const data = await getMessages(communityId);
      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      await sendMessage({
        community: communityId,
        sender: user._id,
        message,
      });

      setMessage("");
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-container">

      <div className="chat-header">
        <h2>💬 Community Chat</h2>
        <span>{messages.length} Messages</span>
      </div>

      <div className="chat-messages">

        {messages.length === 0 ? (
          <div className="empty-chat">
            <h3>No Messages Yet</h3>
            <p>Start the conversation 🚀</p>
          </div>
        ) : (
          messages.map((msg) => (
            <Message
              key={msg._id}
              msg={msg}
              currentUser={user}
            />
          ))
        )}

        <div ref={messagesEndRef}></div>

      </div>

      <div className="chat-input-area">

        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={handleSend}>
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatBox;