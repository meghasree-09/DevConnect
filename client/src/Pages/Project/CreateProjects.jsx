import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createProject } from "../../api/projectapi";
import "./Project.css";

function CreateProjects() {

  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technology, setTechnology] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!user) {
      alert("Please login first.");
      return;
    }

    try {

      const newProject = {
        title,
        description,
        technologies: technology
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech !== ""),

        createdBy: user._id,
      };

      await createProject(newProject);

      alert("Project Created Successfully");

      setTitle("");
      setDescription("");
      setTechnology("");

      navigate("/projects");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to Create Project"
      );

    }

  };

  return (

    <div className="project-page">

      <div className="project-card">

        <h1>Create Project</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Technologies Used (React, Node, MongoDB)"
            value={technology}
            onChange={(e) =>
              setTechnology(e.target.value)
            }
            required
          />

          <button type="submit">
            Create Project
          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateProjects;