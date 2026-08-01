import "./UserProfile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserTag,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaUsers,
  FaProjectDiagram,
  FaEdit,
  FaLock,
} from "react-icons/fa";

function UserProfile() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [projects, setProjects] = useState([]);
  const [communities, setCommunities] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user?._id) {
      loadProfile();
    }

  }, [user]);

  const loadProfile = async () => {

    try {

      const [
        userRes,
        projectRes,
        communityRes,
      ] = await Promise.all([

        api.get(`/users/${user._id}`),
        api.get("/projects"),
        api.get("/communities"),

      ]);

      setProfile(userRes.data);

      const joinedProjects =
        (projectRes.data || []).filter((project) =>
          project.teamMembers?.includes(user._id)
        );

      setProjects(joinedProjects);

      const joinedCommunities =
        (communityRes.data || []).filter((community) =>
          community.members?.includes(user._id)
        );

      setCommunities(joinedCommunities);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <h2>Loading Profile...</h2>;

  }

  return (

    <div className="user-profile">

      {/* Header */}

      <div className="profile-header">

        <div className="profile-avatar">

          {profile?.profileImage ? (

            <img
              src={profile.profileImage}
              alt={profile.userName}
            />

          ) : (

            <FaUserCircle />

          )}

        </div>

        <div className="profile-info">

          <h1>{profile?.userName}</h1>

          <span className="role-badge">

            <FaUserTag />

            {profile?.role}

          </span>

          <div className="profile-contact">

            <span>

              <FaEnvelope />

              {profile?.email}

            </span>

            <span>

              <FaPhone />

              {profile?.phone}

            </span>

            <span>

              <FaMapMarkerAlt />

              {profile?.location || "Location not added"}

            </span>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">

          <FaProjectDiagram />

          <h2>{projects.length}</h2>

          <p>Projects Joined</p>

        </div>

        <div className="stat-card">

          <FaUsers />

          <h2>{communities.length}</h2>

          <p>Communities</p>

        </div>

      </div>

            {/* About */}

      <div className="profile-section">

        <h2>About</h2>

        <p className="bio-text">
          {profile?.bio || "No bio added yet."}
        </p>

      </div>

      {/* Skills */}

      <div className="profile-section">

        <h2>Skills</h2>

        <div className="skills-container">

          {(profile?.skills?.length
            ? profile.skills
            : ["React", "Node.js", "MongoDB", "JavaScript"]
          ).map((skill, index) => (

            <span
              key={index}
              className="skill-chip"
            >
              {skill}
            </span>

          ))}

        </div>

      </div>

      {/* Social Links */}

      <div className="profile-section">

        <h2>Social Links</h2>

        <div className="social-links">

          {profile?.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
              GitHub
            </a>
          )}

          {profile?.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
              LinkedIn
            </a>
          )}

          {profile?.portfolio && (
            <a
              href={profile.portfolio}
              target="_blank"
              rel="noreferrer"
            >
              <FaGlobe />
              Portfolio
            </a>
          )}

        </div>

      </div>

      {/* Joined Projects */}

      <div className="profile-section">

        <h2>Joined Projects</h2>

        {projects.length === 0 ? (

          <p>No projects joined yet.</p>

        ) : (

          <div className="card-grid">

            {projects.map((project) => (

              <div
                key={project._id}
                className="info-card"
              >

                <h3>{project.title}</h3>

                <p>{project.description}</p>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Joined Communities */}

      <div className="profile-section">

        <h2>Joined Communities</h2>

        {communities.length === 0 ? (

          <p>No communities joined yet.</p>

        ) : (

          <div className="card-grid">

            {communities.map((community) => (

              <div
                key={community._id}
                className="info-card"
              >

                <h3>{community.name}</h3>

                <p>{community.description}</p>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Action Buttons */}

      <div className="profile-actions">

        <button
          className="edit-btn"
          onClick={() => navigate("/edit-profile")}
        >
          <FaEdit />
          Edit Profile
        </button>

        <button
          className="password-btn"
          onClick={() => navigate("/change-password")}
        >
          <FaLock />
          Change Password
        </button>

      </div>

    </div>

  );

}

export default UserProfile;