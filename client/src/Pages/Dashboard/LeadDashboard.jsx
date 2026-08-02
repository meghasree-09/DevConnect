import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

import {
  FaProjectDiagram,
  FaUsers,
  FaClock,
} from "react-icons/fa";

import "./LeadDashboard.css";

const LeadDashboard = () => {
  const { user, logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?._id) {
      loadDashboard();
    }
  }, [user]);

  const loadDashboard = async () => {
    if (!user?._id) return;

    try {
      const [
        projectRes,
        developerRes,
        requestRes,
      ] = await Promise.all([
        api.get("/projects"),
        api.get("/developers"),
        api.get(`/teamrequests/${user._id}`),
      ]);

      setProjects(projectRes.data || []);
      setDevelopers(developerRes.data || []);
      setRequests(requestRes.data || []);
    } catch (err) {
      console.error(err);
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
      role="projectLead"
      user={user}
      onLogout={logout}
    >
      <section className="welcome-section">
        <h1>Welcome, {user?.userName} 👋</h1>
        <p>Manage your projects and your development team.</p>
      </section>

      {/* Statistics */}

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
            <h2>{developers.length}</h2>
            <p>Developers</p>
          </div>

        </div>

        <div className="stat-card orange">

          <div className="stat-icon">
            <FaUsers />
          </div>

          <div>
            <h2>{requests.length}</h2>
            <p>Team Requests</p>
          </div>

        </div>

        <div className="stat-card purple">

          <div className="stat-icon">
            <FaClock />
          </div>

          <div>
            <h2>5</h2>
            <p>Deadlines</p>
          </div>

        </div>

      </section>

      {/* My Projects */}

      <section className="dashboard-section">

        <div className="table-card">

          <div className="table-header">

            <h2>My Projects</h2>

            <span>{projects.length} Projects</span>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Members</th>
                </tr>

              </thead>

              <tbody>

                {projects.slice(0,6).map((project)=>(
                  <tr key={project._id}>

                    <td>{project.title}</td>

                    <td>
                      <span className="status active">
                        {project.status || "Active"}
                      </span>
                    </td>

                    <td>
                      {project.teamMembers?.length || 0}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>
            {/* Pending Team Requests */}

      <section className="dashboard-section">

        <div className="table-card">

          <div className="table-header">

            <h2>Pending Team Requests</h2>

            <span>{requests.length} Requests</span>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Developer</th>
                  <th>Project</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {requests.length === 0 ? (

                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      No pending requests.
                    </td>
                  </tr>

                ) : (

                  requests.slice(0, 5).map((request) => (

                    <tr key={request._id}>

                      <td>
                        {request.userId?.name || "Unknown"}
                      </td>

                      <td>
                        {request.projectId?.title || "Unknown"}
                      </td>

                      <td>
                        <span className="status pending">
                          {request.status || "Pending"}
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

      {/* Project Progress */}

      <section className="dashboard-section">

        <div className="activity-card">

          <h2>Project Progress</h2>

          <div className="progress-item">

            <p>DevConnect</p>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{ width: "80%" }}
              ></div>

            </div>

          </div>

          <div className="progress-item">

            <p>Backend API</p>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{ width: "70%" }}
              ></div>

            </div>

          </div>

          <div className="progress-item">

            <p>Frontend UI</p>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{ width: "90%" }}
              ></div>

            </div>

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

              <p>New developer joined one of your projects.</p>

            </div>

            <div className="activity-item">

              <div className="dot green"></div>

              <p>Your latest project was updated successfully.</p>

            </div>

            <div className="activity-item">

              <div className="dot orange"></div>

              <p>You received a new join request.</p>

            </div>

          </div>

        </div>

      </section>

    </DashboardLayout>

  );

};

export default LeadDashboard;