import "./Message.css";

function Message({ msg, currentUser }) {
  const isMine = msg.sender?._id === currentUser?._id;

  return (
    <div className={`message-row ${isMine ? "mine" : "other"}`}>
      <div className="avatar">
        {msg.sender?.userName?.charAt(0).toUpperCase()}
      </div>

      <div className={`message-card ${isMine ? "mine-card" : ""}`}>
        <div className="message-top">
          <span className="sender">{msg.sender?.userName}</span>

          <span className="time">
            {new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <p>{msg.message}</p>
      </div>
    </div>
  );
}

export default Message;