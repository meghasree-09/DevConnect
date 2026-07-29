import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

import {
  FaUsers,
  FaProjectDiagram,
  FaUserTie,
  FaUsersCog,
} from "react-icons/fa";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        usersRes,
        projectsRes,
        developersRes,
        communitiesRes,
      ] = await Promise.all([
        api.get("/users"),
        api.get("/projects"),
        api.get("/developers"),
        api.get("/communities"),
      ]);

      setUsers(usersRes.data || []);
      setProjects(projectsRes.data || []);
      setDevelopers(developersRes.data || []);
      setCommunities(communitiesRes.data || []);
    } catch (error) {
      console.error("Dashboard Error:", error);
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
      role="admin"
      user={user}
      onLogout={logout}
    >
      {/* Welcome */}

      <section className="welcome-section">

        <div>

          <h1>
            Welcome back, {user?.userName || user?.name} 👋
          </h1>

          <p>
            Here's what's happening in DevConnect today.
          </p>

        </div>

      </section>

      {/* Statistics */}

      <section className="stats-grid">

        <div className="stat-card blue">

          <div className="stat-icon">
            <FaUsers />
          </div>

          <div>

            <h2>{users.length}</h2>

            <p>Total Users</p>

          </div>

        </div>

        <div className="stat-card green">

          <div className="stat-icon">
            <FaProjectDiagram />
          </div>

          <div>

            <h2>{projects.length}</h2>

            <p>Projects</p>

          </div>

        </div>

        <div className="stat-card orange">

          <div className="stat-icon">
            <FaUserTie />
          </div>

          <div>

            <h2>{developers.length}</h2>

            <p>Developers</p>

          </div>

        </div>

        <div className="stat-card purple">

          <div className="stat-icon">
            <FaUsersCog />
          </div>

          <div>

            <h2>{communities.length}</h2>

            <p>Communities</p>

          </div>

        </div>

      </section>

      {/* Recent Users */}

      <section className="dashboard-section">

        <div className="table-card">

          <div className="table-header">

            <h2>Recent Users</h2>

            <button
              className="view-all-btn"
              onClick={() => navigate("/users")}
            >
              View All ({users.length})
            </button>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>

                </tr>

              </thead>

              <tbody>
                                {users.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.slice(0, 6).map((item) => (
                    <tr key={item._id}>
                      <td>{item.userName || item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        <span className={`role ${item.role}`}>
                          {item.role}
                        </span>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </section>

      {/* Recent Activity */}

      <section className="dashboard-section">

        <div className="activity-card">

          <h2>Recent Activity</h2>

          <div className="activity-list">

            <div className="activity-item">
              <div className="dot blue"></div>
              <p>New user registered.</p>
            </div>

            <div className="activity-item">
              <div className="dot green"></div>
              <p>Project submitted successfully.</p>
            </div>

            <div className="activity-item">
              <div className="dot orange"></div>
              <p>Community created.</p>
            </div>

            <div className="activity-item">
              <div className="dot purple"></div>
              <p>Developer profile updated.</p>
            </div>

          </div>

        </div>

      </section>

    </DashboardLayout>
  );
};

export default AdminDashboard;