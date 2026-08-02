import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaProjectDiagram,
  FaUsers,
  FaClipboardList,
  FaEdit,
  FaLock,
} from "react-icons/fa";

import "./LeadProfile.css";

const LeadProfile = () => {

  const { user, logout } = useAuth();

  const [projects, setProjects] = useState([]);
  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {

      const [projectRes, requestRes] =
        await Promise.all([
          api.get("/projects"),
          api.get(`/teamrequests/${user._id}`),
        ]);

    const myProjects = (projectRes.data || []).filter((project) => {
  if (!project.createdBy) return false;

  if (typeof project.createdBy === "object") {
    return project.createdBy._id === user._id;
  }

  return project.createdBy === user._id;
});

      setProjects(myProjects);

      setRequests(requestRes.data || []);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalMembers =
    projects.reduce(
      (sum, project) =>
        sum +
        (project.teamMembers?.length || 0),
      0
    );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (
    <DashboardLayout
      role="projectLead"
      user={user}
      onLogout={logout}
    >

      <div className="lead-profile">

        {/* Header */}

        <div className="lead-card">

          <div className="lead-avatar">

            <FaUserCircle />

          </div>

          <div className="lead-details">

            <h2>
              {user?.userName}
            </h2>

            <p>
              Project Lead
            </p>

            <div className="lead-info">

              <span>
                <FaEnvelope />
                {user?.email}
              </span>

              <span>
                <FaPhone />
                {user?.phone}
              </span>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="lead-stats">

          <div className="lead-stat">

            <FaProjectDiagram />

            <h2>{projects.length}</h2>

            <p>Projects</p>

          </div>

          <div className="lead-stat">

            <FaUsers />

            <h2>{totalMembers}</h2>

            <p>Team Members</p>

          </div>

          <div className="lead-stat">

            <FaClipboardList />

            <h2>{requests.length}</h2>

            <p>Requests</p>

          </div>

        </div>

                {/* Skills */}

        <div className="lead-section">

          <h3>Skills</h3>

          <div className="skills-container">

            {(user?.skills || [
              "Leadership",
              "MERN Stack",
              "MongoDB",
              "React",
              "Node.js",
              "Team Management",
            ]).map((skill, index) => (

              <span
                key={index}
                className="skill-chip"
              >
                {skill}
              </span>

            ))}

          </div>

        </div>

        {/* Projects */}

        <div className="lead-section">

          <h3>My Projects</h3>

          {projects.length === 0 ? (

            <p>No projects created yet.</p>

          ) : (

            <div className="project-list">

              {projects.map((project) => (

                <div
                  key={project._id}
                  className="project-card"
                >

                  <h4>{project.title}</h4>

                  <p>
                    {project.description}
                  </p>

                  <span>
                    Team Members :
                    {" "}
                    {project.teamMembers?.length || 0}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Social Links */}

        <div className="lead-section">

          <h3>Social Profiles</h3>

          <div className="social-links">

            <a
              href={user?.github || "#"}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
              GitHub
            </a>

            <a
              href={user?.linkedin || "#"}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
              LinkedIn
            </a>

            <a
              href={user?.portfolio || "#"}
              target="_blank"
              rel="noreferrer"
            >
              <FaGlobe />
              Portfolio
            </a>

          </div>

        </div>

        {/* Actions */}

        <div className="lead-actions">

          <button className="edit-btn">

            <FaEdit />

            Edit Profile

          </button>

          <button className="password-btn">

            <FaLock />

            Change Password

          </button>

        </div>

      </div>

    </DashboardLayout>

  );

};

export default LeadProfile;