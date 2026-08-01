import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaUsers,
  FaProjectDiagram,
  FaUserTie,
  FaUsersCog,
  FaEdit,
  FaLock,
} from "react-icons/fa";

import "./AdminProfile.css";

const AdminProfile = () => {
  const { user, logout } = useAuth();

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [communities, setCommunities] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
      role="admin"
      user={user}
      onLogout={logout}
    >
      <div className="admin-profile">

        {/* Profile Card */}

        <div className="profile-card">

          <div className="profile-avatar">

            <FaUserCircle />

          </div>

          <div className="profile-details">

            <h2>{user?.userName || user?.name}</h2>

            <p className="role">
              Administrator
            </p>

            <div className="profile-info">

              <p>
                <FaEnvelope />
                {user?.email}
              </p>

              <p>
                <FaPhone />
                {user?.phone}
              </p>

              <p>
                <FaUserShield />
                {user?.role}
              </p>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="profile-stats">

          <div className="profile-stat-card blue">

            <FaUsers />

            <h2>{users.length}</h2>

            <p>Total Users</p>

          </div>

          <div className="profile-stat-card green">

            <FaProjectDiagram />

            <h2>{projects.length}</h2>

            <p>Projects</p>

          </div>

          <div className="profile-stat-card orange">

            <FaUserTie />

            <h2>{developers.length}</h2>

            <p>Developers</p>

          </div>

          <div className="profile-stat-card purple">

            <FaUsersCog />

            <h2>{communities.length}</h2>

            <p>Communities</p>

          </div>

        </div>
                {/* Account Information */}

        <div className="profile-content">

          <div className="profile-section">

            <h3>Account Information</h3>

            <div className="info-grid">

              <div className="info-card">
                <span>Name</span>
                <strong>{user?.userName || user?.name}</strong>
              </div>

              <div className="info-card">
                <span>Email</span>
                <strong>{user?.email}</strong>
              </div>

              <div className="info-card">
                <span>Phone</span>
                <strong>{user?.phone}</strong>
              </div>

              <div className="info-card">
                <span>Role</span>
                <strong>{user?.role}</strong>
              </div>

            </div>

          </div>

          {/* About */}

          <div className="profile-section">

            <h3>About</h3>

            <p className="about-text">
              As an Administrator, you oversee the DevConnect platform,
              manage users, projects, communities, and ensure smooth
              collaboration between developers and project leads.
            </p>

          </div>

          {/* Actions */}

          <div className="profile-actions">

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

      </div>

    </DashboardLayout>

  );

};

export default AdminProfile;