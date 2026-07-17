import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function LeadDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem(
      "loggedInUser"
    )
  );

  const handleLogout = () => {
    localStorage.removeItem(
      "loggedInUser"
    );

    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-card">

        <div className="dashboard-header">

          <div>
            <h1>
              Welcome,
              {" "}
              {user?.studentName}
            </h1>

            <p>
              Email :
              {" "}
              {user?.email}
            </p>

            <p>
              Role :
              {" "}
              {user?.role}
            </p>
          </div>

          <button
            className="logout-btn"
            onClick={
              handleLogout
            }
          >
            Logout
          </button>

        </div>

        <div className="dashboard-grid">

          <button
            className="dashboard-box"
            type="button"
            onClick={() =>
              handleNavigation(
                "/create-project"
              )
            }
          >
            <h2>
              Create Project
            </h2>

            <p>
              Create new projects
              and recruit members.
            </p>
          </button>

          <button
            className="dashboard-box"
            type="button"
            onClick={() =>
              handleNavigation(
                "/manage-projects"
              )
            }
          >
            <h2>
              Manage Projects
            </h2>

            <p>
              View and manage
              your projects.
            </p>
          </button>

          <button
            className="dashboard-box"
            type="button"
            onClick={() =>
              handleNavigation(
                "/team-requests"
              )
            }
          >
            <h2>
              Team Requests
            </h2>

            <p>
              Accept or reject
              join requests.
            </p>
          </button>

          <button
            className="dashboard-box"
            type="button"
            onClick={() =>
              handleNavigation(
                "/developers"
              )
            }
          >
            <h2>
              Developers
            </h2>

            <p>
              Connect with other
              developers.
            </p>
          </button>

        </div>

      </div>

    </div>
  );
}

export default LeadDashboard;