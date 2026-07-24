import "./CommunityHeader.css";

function CommunityHeader({ community, joined }) {
  return (
    <div className="community-header">

      <div className="community-cover">

        <div className="community-overlay">

          <h1>{community.name}</h1>

          <p>{community.description}</p>

          <div className="community-info">

            <div className="info-card">
              <h2>{community.members?.length || 0}</h2>
              <span>Members</span>
            </div>

            <div className="info-card">
              <h2>{community.resources?.length || 0}</h2>
              <span>Resources</span>
            </div>

            <div className="info-card">
              <h2>{community.events?.length || 0}</h2>
              <span>Events</span>
            </div>

            <div className="info-card">
              <h2>{community.category}</h2>
              <span>Category</span>
            </div>

          </div>

          <div className="join-status">

            {joined ? (
              <button className="joined-btn">
                ✓ Joined
              </button>
            ) : (
              <button className="join-btn">
                Join Community
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default CommunityHeader;