import { useEffect, useState } from "react";
import "./CommunityResources.css";
import {
  getResources,
  deleteResource,
} from "../../api/resourceApi";
import CreateResource from "./CreateResource";
import { useAuth } from "../../context/AuthContext";

function CommunityResources({ communityId }) {
  const { user } = useAuth();

  const [resources, setResources] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (communityId) {
      loadResources();
    }
  }, [communityId]);

  async function loadResources() {
    try {
      const data = await getResources(communityId);
      setResources(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteResource(id);
      loadResources();
    } catch (err) {
      console.log(err.response?.data);
    }
  }

  function handleAction(resource) {
    if (resource.type === "document") {
      window.open(
        `http://localhost:8000/uploads/${resource.file}`,
        "_blank"
      );
    } else {
      window.open(resource.link, "_blank");
    }
  }

  function getButtonText(type) {
    switch (type) {
      case "document":
        return "Download";
      case "github":
        return "Open";
      case "video":
        return "Watch";
      case "website":
        return "Visit";
      default:
        return "Open";
    }
  }

  function getIcon(type) {
    switch (type) {
      case "document":
        return "📄";
      case "github":
        return "💻";
      case "video":
        return "🎥";
      case "website":
        return "🌐";
      default:
        return "📁";
    }
  }

  return (
    <div className="community-resources">
      <div className="resource-header">
        <h2>Community Resources</h2>

        <button
          className="upload-btn"
          onClick={() => setShowForm(true)}
        >
          + Upload Resource
        </button>
      </div>

      <div className="resource-grid">
        {resources.length === 0 ? (
          <h3>No Resources Available</h3>
        ) : (
          resources.map((resource) => (
            <div
              className="resource-card"
              key={resource._id}
            >
              <div className="resource-icon">
                {getIcon(resource.type)}
              </div>

              <h3>{resource.title}</h3>

              <p>{resource.description}</p>

              <button
                className="resource-btn"
                onClick={() =>
                  handleAction(resource)
                }
              >
                {getButtonText(resource.type)}
              </button>

              {(user?.role === "admin" ||
                resource.uploadedBy?._id ===
                  user?._id) && (
                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(resource._id)
                  }
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {showForm && (
        <CreateResource
          communityId={communityId}
          userId={user?._id}
          onCreated={loadResources}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default CommunityResources;