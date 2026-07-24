import "./Project.css";
import { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

import { getProjects, deleteProject } from "../../api/projectapi";
import { useAuth } from "../../context/AuthContext";

function ManageProjects() {
  const navigate=useNavigate();
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await getProjects();

     const myProjects = data.filter((project) => {
  if (typeof project.createdBy === "object") {
    return project.createdBy._id === user?._id;
  }
  return project.createdBy === user?._id;
});

      setProjects(myProjects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);
      loadProjects();
    } catch (error) {
      console.log(error);
      alert("Failed to delete project");
    }
  }

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="project-page">

      <div className="project-card">

        <h1>Manage Projects</h1>

        {projects.length === 0 ? (

          <p>No Projects Found</p>

        ) : (

          <div className="project-grid">

            {projects.map((project) => (

              <div
                key={project._id}
                className="project-box"
              >

                <h2>{project.title}</h2>

                <p>{project.description}</p>

                <h4>
                  Tech :
                  {" "}
                  {project.technologies?.join(", ")}
                </h4>

                <div className="project-actions">

                  <Link
                    to={`/edit-project/${project._id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>
                  <button
                    className="team-btn"
                    onClick={() => navigate(`/team/${project._id}`)}
                  >
                    My Team
                  </button>
                  <button
                    className="task-btn"
                    onClick={() => navigate(`/tasks/${project._id}`)}
                  >
                    Tasks
                  </button>

                  <button
                    className="chat-btn"
                    onClick={() => navigate(`/chat/${project._id}`)}
                  >
                    Chat
                  </button>


                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default ManageProjects;