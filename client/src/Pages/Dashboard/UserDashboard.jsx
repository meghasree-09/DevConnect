import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function UserDashboard() {
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
              Email:
              {" "}
              {user?.email}
            </p>

            <p>
              Role:
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
            type="button"
            className="dashboard-box"
            onClick={() => navigate("/communities")}
          >
            <h2>
              Communities
            </h2>

            <p>
              Join and explore
              developer communities.
            </p>
          </button>

          <button
            type="button"
            className="dashboard-box"
            onClick={() => navigate("/projects")}
          >
            <h2>Projects</h2>

            <p>Explore and contribute to projects.</p>
          </button>

          <button
            type="button"
            className="dashboard-box"
            onClick={() => navigate("/developers")}
          >
            <h2>Developers</h2>

            <p>Connect with other developers.</p>
          </button>

          <button
            type="button"
            className="dashboard-box"
            onClick={() => navigate("/contact")}
          >
            <h2>Contact</h2>

            <p>Reach out to the DevConnect team.</p>
          </button>

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;