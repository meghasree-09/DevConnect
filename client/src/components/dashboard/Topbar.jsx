import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import NotificationMenu from "./NotificationMenu";
import "./Topbar.css";

const Topbar = ({ user, onLogout }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="topbar">

      <div className="topbar-left">

        <div className="search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search projects, developers..."
          />

        </div>

      </div>

      <div className="topbar-right">

        <div className="today">
          {today}
        </div>

        {/* Notifications */}

       <div
  className="notification"
  onClick={() =>
    setNotificationOpen(!notificationOpen)
  }
>

  <FaBell />

  <span>3</span>

  {notificationOpen && (
    <NotificationMenu />
  )}

</div>

        {/* Profile */}

        <div
          className="profile"
          onClick={() =>
            setProfileOpen(!profileOpen)
          }
        >

          <FaUserCircle className="profile-icon" />

          <div>

            <h4>
              {user?.userName || "User"}
            </h4>

            <small>
              {user?.role || "Member"}
            </small>

          </div>

          <FaChevronDown />

          {profileOpen && (

           <div className="profile-menu">

  <button
    onClick={() => {
      if (user?.role === "admin") {
        navigate("/admin/profile");
      } else if (user?.role === "projectLead") {
        navigate("/lead/profile");
      } else {
        navigate("/user/profile");
      }
    }}
  >
    My Profile
  </button>

  <button
    onClick={() => navigate("/settings")}
  >
    Settings
  </button>

  <button
    onClick={() => navigate("/help")}
  >
    Help
  </button>

  <button
    className="logout-item"
    onClick={onLogout}
  >
    Logout
  </button>

</div>

          )}

        </div>

      </div>

    </header>
  );
};

export default Topbar;