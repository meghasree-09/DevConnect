import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

function LeadDashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
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
            <h1>Welcome, {user?.userName}</h1>

            <p>Email : {user?.email}</p>

            <p>Role : {user?.role}</p>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="dashboard-grid">

          <button
            className="dashboard-box"
            onClick={() => handleNavigation("/create-project")}
          >
            <h2>Create Project</h2>

            <p>Create a new project.</p>
          </button>

          <button
            className="dashboard-box"
            onClick={() => handleNavigation("/manage-projects")}
          >
            <h2>Manage Projects</h2>

            <p>Edit or delete your projects.</p>
          </button>

          <button
            className="dashboard-box"
            onClick={() => handleNavigation("/team-requests")}
          >
            <h2>Team Requests</h2>

            <p>Accept or reject requests.</p>
          </button>

          <button
            className="dashboard-box"
            onClick={() => handleNavigation("/developers")}
          >
            <h2>Developers</h2>

            <p>View developer profiles.</p>
          </button>

         

    


        </div>
      </div>
    </div>
  );
}

export default LeadDashboard;