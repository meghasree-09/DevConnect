import "./Notifications.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../../api/notificationApi";

function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getUserNotifications(user._id);
      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRead = async (id) => {
    await markNotificationAsRead(id);
    loadNotifications();
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    loadNotifications();
  };

  return (
    <div className="notifications-page">
      <h1>Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification._id}
            className={`notification-card ${
              notification.isRead ? "read" : "unread"
            }`}
          >
            <h3>{notification.message}</h3>

            <p>
              From: {notification.sender?.userName}
            </p>

            <p>
              {new Date(
                notification.createdAt
              ).toLocaleString()}
            </p>

            {!notification.isRead && (
              <button
                onClick={() =>
                  handleRead(notification._id)
                }
              >
                Mark as Read
              </button>
            )}

            <button
              onClick={() =>
                handleDelete(notification._id)
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;