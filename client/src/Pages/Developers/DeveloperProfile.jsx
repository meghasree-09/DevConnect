import "./DeveloperProfile.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDeveloper } from "../../api/developerApi";

function DeveloperProfile() {

  const { id } = useParams();

  const [developer, setDeveloper] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchDeveloper();

  }, [id]);

  const fetchDeveloper =
    async () => {

      try {

        const response =
          await getDeveloper(id);

        setDeveloper(
          response.data
        );

      }
      catch (error) {

        console.log(error);

      }
      finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (
      <h2>
        Loading...
      </h2>
    );

  }

  return (

    <div className="developer-profile">

      <img
        src={
          developer.image ||
          "https://dummyimage.com/250x250/2563eb/ffffff&text=Developer"
        }
        alt={developer.name}
        className="developer-image"
      />

      <h1 className="developer-name">
        {developer.name}
      </h1>

      <h3 className="developer-role">
        {developer.role}
      </h3>

      <p className="developer-bio">
        {developer.bio}
      </p>

      <p className="developer-location">
        📍 {developer.location}
      </p>

      <div className="skills-container">

        {
          developer.skills?.map(
            (skill, index) => (

              <span
                key={index}
                className="skill"
              >
                {skill}
              </span>

            )
          )
        }

      </div>

      <div className="social-links">

        {
          developer.github &&
          (
            <a
              href={
                developer.github
              }
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )
        }

        {
          developer.linkedin &&
          (
            <a
              href={
                developer.linkedin
              }
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          )
        }

        {
          developer.portfolio &&
          (
            <a
              href={
                developer.portfolio
              }
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
          )
        }

      </div>

    </div>

  );
}

export default DeveloperProfile;