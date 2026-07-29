import React from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaProjectDiagram,
  FaUserFriends,
  FaUserTie,
  FaCode,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ role, isOpen, toggleSidebar, onLogout }) => {
  const navigate = useNavigate();

  const adminMenu = [
    { title: "Dashboard", icon: <FaTachometerAlt />, path: "/admin-dashboard" },
    { title: "Users", icon: <FaUsers />, path: "/manage-users" },
    { title: "Projects", icon: <FaProjectDiagram />, path: "/manage-projects" },
    { title: "Communities", icon: <FaUserFriends />, path: "/communities" },
    { title: "Developers", icon: <FaCode />, path: "/developers" },
  ];

  const leadMenu = [
    { title: "Dashboard", icon: <FaTachometerAlt />, path: "/lead-dashboard" },
    { title: "Create Project", icon: <FaProjectDiagram />, path: "/create-project" },
    { title: "Manage Projects", icon: <FaProjectDiagram />, path: "/projects" },
    { title: "Team Requests", icon: <FaUsers />, path: "/team-requests" },
    { title: "Developers", icon: <FaCode />, path: "/developers" },
  ];

  const userMenu = [
    { title: "Dashboard", icon: <FaTachometerAlt />, path: "/user-dashboard" },
    { title: "Projects", icon: <FaProjectDiagram />, path: "/projects" },
    { title: "Communities", icon: <FaUserFriends />, path: "/communities" },
    { title: "Developers", icon: <FaCode />, path: "/developers" },
    { title: "Profile", icon: <FaUserTie />, path: "/profile" },
  ];

  let menuItems = [];

  switch (role) {
    case "admin":
      menuItems = adminMenu;
      break;
    case "projectLead":
      menuItems = leadMenu;
      break;
    default:
      menuItems = userMenu;
  }

  return (
    <>
      <button className="mobile-toggle" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div>
          <div className="sidebar-logo">
            <h2>DevConnect</h2>
            <p>{role.toUpperCase()}</p>
          </div>

          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.title} onClick={() => navigate(item.path)}>
                {item.icon}
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <button className="logout-button" onClick={onLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;