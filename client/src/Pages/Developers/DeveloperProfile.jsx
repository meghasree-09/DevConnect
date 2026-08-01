import "./DeveloperProfile.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDeveloper } from "../../api/developerApi";

import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaCode,
  FaProjectDiagram,
} from "react-icons/fa";

function DeveloperProfile() {

  const { id } = useParams();

  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeveloper();
  }, [id]);

  const fetchDeveloper = async () => {

    try {

      const response = await getDeveloper(id);

      setDeveloper(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!developer) {
    return <h2>Developer Not Found</h2>;
  }

  return (

    <div className="developer-profile">

      {/* Header */}

      <div className="developer-header">

        <div className="developer-avatar">

          {developer.image ? (

            <img
              src={developer.image}
              alt={developer.name}
            />

          ) : (

            <FaUserCircle />

          )}

        </div>

        <div className="developer-info">

          <h1>{developer.name}</h1>

          <h3>{developer.role}</h3>

          <p className="location">

            <FaMapMarkerAlt />

            {developer.location || "Location not available"}

          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="developer-stats">

        <div className="stat-card">

          <FaCode />

          <h2>
            {developer.skills?.length || 0}
          </h2>

          <p>Skills</p>

        </div>

        <div className="stat-card">

          <FaProjectDiagram />

          <h2>
            {developer.projects?.length || 0}
          </h2>

          <p>Projects</p>

        </div>

      </div>

            {/* About */}

      <div className="developer-section">

        <h2>About</h2>

        <p className="developer-bio">
          {developer.bio || "No bio available."}
        </p>

      </div>

      {/* Skills */}

      <div className="developer-section">

        <h2>Skills</h2>

        <div className="skills-container">

          {developer.skills?.length ? (
            developer.skills.map((skill, index) => (
              <span
                key={index}
                className="skill-chip"
              >
                {skill}
              </span>
            ))
          ) : (
            <p>No skills added.</p>
          )}

        </div>

      </div>

      {/* Projects */}

      <div className="developer-section">

        <h2>Projects</h2>

        {developer.projects?.length ? (

          <div className="project-grid">

            {developer.projects.map((project, index) => (

              <div
                key={project._id || index}
                className="project-card"
              >

                <h3>
                  {project.title || project.name}
                </h3>

                <p>
                  {project.description || "No description available."}
                </p>

              </div>

            ))}

          </div>

        ) : (

          <p>No projects available.</p>

        )}

      </div>

      {/* Social Links */}

      <div className="developer-section">

        <h2>Connect</h2>

        <div className="social-links">

          {developer.github && (
            <a
              href={developer.github}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
              GitHub
            </a>
          )}

          {developer.linkedin && (
            <a
              href={developer.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
              LinkedIn
            </a>
          )}

          {developer.portfolio && (
            <a
              href={developer.portfolio}
              target="_blank"
              rel="noreferrer"
            >
              <FaGlobe />
              Portfolio
            </a>
          )}

        </div>

      </div>

    </div>

  );

}

export default DeveloperProfile;