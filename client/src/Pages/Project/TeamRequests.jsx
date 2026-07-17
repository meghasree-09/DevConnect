import "./Project.css";

function TeamRequests() {
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
          Team Requests
        </h1>

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
                Requests:
                {" "}
                {
                  project
                    .requests
                    ?.length ||
                  0
                }
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default TeamRequests;