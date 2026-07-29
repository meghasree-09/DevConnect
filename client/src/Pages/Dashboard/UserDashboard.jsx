import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

import {
  FaProjectDiagram,
  FaUsers,
  FaBookmark,
  FaBell,
} from "react-icons/fa";

import "./UserDashboard.css";

const UserDashboard = () => {

  const { user, logout } = useAuth();

  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState([]);

  const [communities, setCommunities] = useState([]);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user?._id) {
      loadDashboard();
    }
  }, [user]);

  const loadDashboard = async () => {
    try {
      if (!user?._id) {
        console.log("User not found");
        setLoading(false);
        return;
      }

      const [projectRes, communityRes, notificationRes] = await Promise.all([
        api.get("/projects"),
        api.get("/communities"),
        api.get(`/notifications/${user._id}`),
      ]);

      setProjects(projectRes.data || []);
      setCommunities(communityRes.data || []);
      setNotifications(notificationRes.data || []);
    } catch (err) {
      console.log("Dashboard Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (

    <DashboardLayout

      role="user"

      user={user}

      onLogout={logout}

    >

      <section className="welcome-section">

        <h1>
          Welcome back, {user?.userName} 👋
        </h1>

        <p>

          Explore projects, join communities and grow your skills.

        </p>

      </section>

      <section className="stats-grid">

        <div className="stat-card blue">

          <div className="stat-icon">

            <FaProjectDiagram />

          </div>

          <div>

            <h2>{projects.length}</h2>

            <p>Projects</p>

          </div>

        </div>

        <div className="stat-card green">

          <div className="stat-icon">

            <FaUsers />

          </div>

          <div>

            <h2>{communities.length}</h2>

            <p>Communities</p>

          </div>

        </div>

        <div className="stat-card orange">

          <div className="stat-icon">

            <FaBookmark />

          </div>

          <div>

            <h2>8</h2>

            <p>Saved Projects</p>

          </div>

        </div>

        <div className="stat-card purple">

          <div className="stat-icon">

            <FaBell />

          </div>

          <div>

            <h2>{notifications.length}</h2>

            <p>Notifications</p>

          </div>

        </div>

      </section>

            {/* Recommended Projects */}

      <section className="dashboard-section">

        <div className="table-card">

          <div className="table-header">

            <h2>Recommended Projects</h2>

            <span>{projects.length} Projects</span>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Project</th>
                  <th>Tech Stack</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {projects.slice(0, 6).map((project) => (

                  <tr key={project._id}>

                    <td>{project.title}</td>

                    <td>{project.techStack || "MERN"}</td>

                    <td>
                      <span className="status active">
                        {project.status || "Open"}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>

      {/* Joined Communities */}

      <section className="dashboard-section">

        <div className="activity-card">

          <h2>Joined Communities</h2>

          <div className="activity-list">

            {communities.slice(0, 5).map((community) => (

              <div
                key={community._id}
                className="activity-item"
              >

                <div className="dot blue"></div>

                <p>{community.name}</p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Skill Progress */}

      <section className="dashboard-section">

        <div className="activity-card">

          <h2>Skill Progress</h2>

          <div className="progress-item">

            <p>React</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "85%" }}
              ></div>
            </div>

          </div>

          <div className="progress-item">

            <p>Node.js</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "70%" }}
              ></div>
            </div>

          </div>

          <div className="progress-item">

            <p>MongoDB</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "65%" }}
              ></div>
            </div>

          </div>

        </div>

      </section>

      {/* Notifications */}

      <section className="dashboard-section">

        <div className="activity-card">

          <h2>Notifications</h2>

          <div className="activity-list">

            {notifications.length === 0 ? (

              <div className="activity-item">

                <div className="dot green"></div>

                <p>No new notifications.</p>

              </div>

            ) : (

              notifications.slice(0, 5).map((notification) => (

                <div
                  key={notification._id}
                  className="activity-item"
                >

                  <div className="dot orange"></div>

                  <p>{notification.message}</p>

                </div>

              ))

            )}

          </div>

        </div>

      </section>

    </DashboardLayout>

  );

};

export default UserDashboard;