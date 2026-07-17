import { useState } from "react";
import "./Project.css";

function CreateProjects() {
  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [technology,
    setTechnology] =
    useState("");

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    const projects =
      JSON.parse(
        localStorage.getItem(
          "projects"
        )
      ) || [];

    const newProject = {
      id: Date.now(),
      title,
      description,
      technology,
      members: [],
      requests: [],
    };

    const updatedProjects = [
      ...projects,
      newProject,
    ];

    localStorage.setItem(
      "projects",
      JSON.stringify(
        updatedProjects
      )
    );

    alert(
      "Project Created Successfully"
    );

    setTitle("");
    setDescription("");
    setTechnology("");
  };

  return (
    <div className="project-page">

      <div className="project-card">

        <h1>
          Create Project
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            required
          />

          <textarea
            placeholder="Project Description"
            value={
              description
            }
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            required
          />

          <input
            type="text"
            placeholder="Technologies Used"
            value={
              technology
            }
            onChange={(e) =>
              setTechnology(
                e.target.value
              )
            }
            required
          />

          <button
            type="submit"
          >
            Create Project
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateProjects;