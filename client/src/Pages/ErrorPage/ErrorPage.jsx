import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-page">

      <div className="error-container">

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Oops! The page you are looking for
          does not exist.
        </p>

        <button
          onClick={() => navigate("/")}
        >
          Go Back Home
        </button>

      </div>

    </div>
  );
}

export default ErrorPage;