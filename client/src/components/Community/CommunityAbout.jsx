import { useEffect, useState } from "react";
import "./CommunityAbout.css";
import EditCommunity from "./EditCommunity.jsx";
import { getCommunity } from "../../api/communityapi";

function CommunityAbout({ community }) {

  const [communityData, setCommunityData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchCommunity();

  }, [community._id]);

  async function fetchCommunity() {

    try {

      const data = await getCommunity(community._id);

      setCommunityData(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!communityData) {
    return <h2>Community not found</h2>;
  }

  return (
    <div className="community-about">

      <div className="about-header">

        <h2>📖 About Community</h2>

        <button
          className="edit-btn"
          onClick={() => setEditing(true)}
        >
          ✏ Edit
        </button>

      </div>

      <div className="about-card">

        <h3>Description</h3>

        <p className="about-description">
          {communityData.description}
        </p>

      </div>

      <div className="about-grid">

        <div className="about-box">

          <h3>📂 Category</h3>

          <span className="category-badge">
            {communityData.category || "General"}
          </span>

        </div>

        <div className="about-box">

          <h3>👥 Members</h3>

          <p>{communityData.members?.length || 0}</p>

        </div>

        <div className="about-box">

          <h3>📚 Resources</h3>

          <p>{communityData.resources?.length || 0}</p>

        </div>

        <div className="about-box">

          <h3>📅 Events</h3>

          <p>{communityData.events?.length || 0}</p>

        </div>

      </div>

      <div className="about-card">

        <h2>💻 Technologies</h2>

        <div className="tech-container">

          {communityData.technologies?.length ? (

            communityData.technologies.map((tech, index) => (

              <span
                className="tech-badge"
                key={index}
              >
                {tech}
              </span>

            ))

          ) : (

            <p>No technologies added.</p>

          )}

        </div>

      </div>

      <div className="about-card">

        <h2>📜 Community Rules</h2>

        {communityData.rules?.length ? (

          <ul className="rules-list">

            {communityData.rules.map((rule, index) => (

              <li key={index}>
                ✅ {rule}
              </li>

            ))}

          </ul>

        ) : (

          <p>No rules available.</p>

        )}

      </div>

      {editing && (

        <EditCommunity
          community={communityData}
          onUpdated={(updatedCommunity) => {

            setCommunityData(updatedCommunity);

            setEditing(false);

          }}
        />

      )}

    </div>
  );
}

export default CommunityAbout;