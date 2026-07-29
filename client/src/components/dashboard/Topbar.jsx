import React, { useState } from "react";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import "./Topbar.css";

const Topbar = ({ user }) => {
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

        <div className="notification">

          <FaBell />

          <span>3</span>

        </div>

        <div
          className="profile"
          onClick={() => setOpen(!open)}
        >

          <FaUserCircle className="profile-icon" />

          <div>

            <h4>{user?.name || "User"}</h4>

            <small>{user?.role || "Member"}</small>

          </div>

          <FaChevronDown />

          {open && (

            <div className="profile-menu">

              <button>My Profile</button>

              <button>Settings</button>

              <button>Help</button>

              <button className="logout-item">
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