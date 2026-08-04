import "./UserProfile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import api from "../../api/api";

import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserTag,
  FaProjectDiagram,
  FaUsers,
  FaCode,
  FaGithub,
  FaLinkedin,
  FaGlobe,
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
          project.teamMembers?.some(
            (member) =>
              member.user === user._id ||
              member.user?._id === user._id
          )
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
    return <h2 className="loading">Loading Profile...</h2>;
  }

  return (

    <DashboardLayout
      role="user"
      user={user}
      onLogout={logout}
    >

      <div className="profile-container">

        <div className="profile-header-card">

          <div className="profile-left">

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

            <div className="profile-details">

              <h1>{profile?.userName}</h1>

              <span className="profile-role">

                <FaUserTag />

                {profile?.role}

              </span>

              <div className="profile-contact">

                <p>

                  <FaEnvelope />

                  {profile?.email}

                </p>

                <p>

                  <FaPhone />

                  {profile?.phone || "Not Added"}

                </p>

                <p>

                  <FaMapMarkerAlt />

                  {profile?.location || "Location Not Added"}

                </p>

              </div>

            </div>

          </div>

          <div className="profile-buttons">

            <button
              className="edit-btn"
              onClick={() => navigate("/edit-profile")}
            >
              <FaEdit />
              Edit Profile
            </button>

            <button className="password-btn">
              <FaLock />
              Change Password
            </button>

          </div>

        </div>

        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card">
            <FaProjectDiagram />
            <h2>{projects.length}</h2>
            <p>Projects</p>
          </div>

          <div className="stat-card">
            <FaUsers />
            <h2>{communities.length}</h2>
            <p>Communities</p>
          </div>

          <div className="stat-card">
            <FaCode />
            <h2>{profile?.skills?.length || 0}</h2>
            <p>Skills</p>
          </div>

          <div className="stat-card">
            <FaUserTag />
            <h2>{profile?.role}</h2>
            <p>Role</p>
          </div>
                  </div>

        {/* About */}

        <div className="profile-section">

          <h2>About Me</h2>

          <p className="bio-text">

            {profile?.bio ||
              "Passionate Computer Science student interested in Full Stack Development, MERN Stack, Cloud Computing and problem solving. Always eager to learn new technologies and collaborate with developers."}

          </p>

        </div>

        {/* Skills */}

        <div className="profile-section">

          <h2>Skills</h2>

          <div className="skills-container">

            {(profile?.skills?.length
              ? profile.skills
              : [
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "React",
                  "Node.js",
                  "Express",
                  "MongoDB",
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

        {/* Social Links */}

        <div className="profile-section">

          <h2>Social Profiles</h2>

          <div className="social-links">

            <a
              href={profile?.github || "#"}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
              GitHub
            </a>

            <a
              href={profile?.linkedin || "#"}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
              LinkedIn
            </a>

            <a
              href={profile?.portfolio || "#"}
              target="_blank"
              rel="noreferrer"
            >
              <FaGlobe />
              Portfolio
            </a>

          </div>

        </div>

        {/* Joined Projects */}

        <div className="profile-section">

          <h2>Joined Projects</h2>

          {projects.length === 0 ? (

            <p className="empty-text">
              No projects joined yet.
            </p>

          ) : (

            <div className="card-grid">

              {projects.map((project) => (

                <div
                  key={project._id}
                  className="project-card"
                >

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <span>
                    Status :
                    {" "}
                    {project.status || "Active"}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Joined Communities */}

        <div className="profile-section">

          <h2>Joined Communities</h2>

          {communities.length === 0 ? (

            <p className="empty-text">
              No communities joined yet.
            </p>

          ) : (

            <div className="card-grid">

              {communities.map((community) => (

                <div
                  key={community._id}
                  className="project-card"
                >

                  <h3>{community.name}</h3>

                  <p>{community.description}</p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>

  );

}

export default UserProfile;