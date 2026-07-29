import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./DashboardLayout.css";

const DashboardLayout = ({
  role,
  user,
  children,
  onLogout,
}) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dashboard-layout">

      <Sidebar
        role={role}
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        onLogout={onLogout}
      />

      <div className="dashboard-main">

        <Topbar
          user={user}
        />

        <main className="dashboard-content">

          {children}

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;