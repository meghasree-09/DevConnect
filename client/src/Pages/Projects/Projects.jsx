import "./Projects.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../api/projectApi";

function Projects() {

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

const fetchProjects = async () => {
  try {

    const data =
      await getProjects();

    console.log(data);

    setProjects(data);

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
      <h2 className="loading">
        Loading Projects...
      </h2>
    );
  }

  return (

    <div className="projects-page">

      <h1>
        Featured Projects
      </h1>

      <p className="project-subtitle">
        Explore innovative projects built by developers.
      </p>

      <div className="project-header">

        <Link to="/create-project">

          <button
            className="add-project-btn"
          >
            + Add Project
          </button>

        </Link>

      </div>

      {
        projects.length === 0 ?

        (

          <h2>
            No Projects Found
          </h2>

        )

        :

        (

          <div className="projects-container">

            {
              projects.map(
                (project) => (

                  <div
                    key={project._id}
                    className="project-card"
                  >

                    {
                      project.image && (

                        <img
                          src={project.image}
                          alt={project.title}
                          className="project-image"
                        />

                      )
                    }

                    <h2>
                      {project.title}
                    </h2>

                    <p>
                      {project.description}
                    </p>

                    <div className="project-buttons">

                      <Link
                        to={`/projects/${project._id}`}
                      >

                        <button
                          className="view-btn"
                        >
                          View Project
                        </button>

                      </Link>

                    </div>

                  </div>

                )
              )
            }

          </div>

        )
      }

    </div>

  );

}

export default Projects;