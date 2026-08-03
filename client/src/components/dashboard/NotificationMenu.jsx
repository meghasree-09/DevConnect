import { useEffect, useRef, useState } from "react";
import { FaBell, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import {
  getUserNotifications,
  markNotificationAsRead,
} from "../../api/notificationApi";
import "./NotificationMenu.css";

function NotificationMenu() {
    const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {

  if(user?._id){
    fetchNotifications();
  }

}, [user]);

  const fetchNotifications = async () => {

  try {

    const data =
      await getUserNotifications(user._id);

    setNotifications(data);

  } catch (error) {

    console.log(error);

  }

};

  const markAsRead = async (id) => {
    try {
     await markNotificationAsRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isRead: true }
            : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="notification-menu"
      ref={menuRef}
    >
      <div className="notification-header">
        <h3>
          <FaBell />
          Notifications
        </h3>
      </div>

      <div className="notification-list">

        {notifications.length === 0 ? (

          <p className="empty-message">
            No Notifications
          </p>

        ) : (

          notifications.map((notification) => (

            <div
              key={notification._id}
              className={`notification-item ${
                notification.isRead ? "read" : "unread"
              }`}
            >
              <div>

                <p>{notification.message}</p>

                <small>
                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}
                </small>

              </div>

              {!notification.isRead && (
                <button
                  className="mark-btn"
                  onClick={() =>
                    markAsRead(notification._id)
                  }
                >
                  <FaCheckCircle />
                </button>
              )}

            </div>

          ))

        )}

      </div>
    </div>
  );
}

export default NotificationMenu;