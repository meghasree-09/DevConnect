    import "./Project.css";

function ManageProjects() {
  const projects =
    JSON.parse(
      localStorage.getItem(
        "projects"
      )
    ) || [];

  return (
    <div className="project-page">

      <div className="project-card">

        <h1>
          Manage Projects
        </h1>

        {projects.length ===
        0 ? (
          <p>
            No Projects Found
          </p>
        ) : (
          <div className="project-grid">

            {projects.map(
              (project) => (
                <div
                  key={
                    project.id
                  }
                  className="project-box"
                >
                  <h2>
                    {
                      project.title
                    }
                  </h2>

                  <p>
                    {
                      project.description
                    }
                  </p>

                  <h4>
                    Tech :
                    {" "}
                    {
                      project.technology
                    }
                  </h4>

                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default ManageProjects;