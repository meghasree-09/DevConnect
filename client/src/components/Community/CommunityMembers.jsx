import "./CommunityMembers.css";
import { useNavigate } from "react-router-dom";

function CommunityMembers({ members }) {

  const navigate = useNavigate();

  return (
    <div className="community-members">

      <h2 className="section-title">
        Community Members
      </h2>

      {members?.length === 0 ? (
        <div className="empty-members">
          No members yet.
        </div>
      ) : (
        <div className="member-grid">

          {members?.map((member) => (

            <div
              className="member-card"
              key={member._id}
            >

              <div className="member-avatar">
                {member.userName?.charAt(0).toUpperCase()}
              </div>

              <h3>{member.userName}</h3>

              <p>{member.email}</p>

              <span className="member-role">
                {member.role}
              </span>

            <button
              className="profile-btn"
              onClick={() => navigate(`/user-profile/${member._id}`)}
            >
              View Profile
            </button>
            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default CommunityMembers;