import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MyTeam.css";

import {
  getTeamMembers,
  updateMemberRole,
  removeMember,
} from "../../api/teamApi";

function MyTeam() {
  const { projectId } = useParams();

  const [project, setProject] = useState({});
  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadTeam();
  }, []);

  async function loadTeam() {
    try {
      const data = await getTeamMembers(projectId);

      setProject(data);
      setMembers(data.teamMembers);
    } catch (error) {
      console.log(error);
    }
  }

  async function changeRole(memberId, role) {
    try {
      await updateMemberRole(
        projectId,
        memberId,
        role
      );

      loadTeam();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMember(memberId) {
    const confirmDelete = window.confirm(
      "Remove this member?"
    );

    if (!confirmDelete) return;

    try {
      await removeMember(projectId, memberId);

      loadTeam();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="team-page">
      <h1>{project.projectName}</h1>

      <h3>Team Members</h3>

      {members.length === 0 ? (
        <p>No Members</p>
      ) : (
        members.map((member) => (
          <div
            className="team-card"
            key={member.user._id}
          >
            <div>
              <h2>{member.user.userName}</h2>

              <p>{member.user.email}</p>
            </div>

            <select
              value={member.role}
              onChange={(e) =>
                changeRole(
                  member.user._id,
                  e.target.value
                )
              }
            >
              <option>Member</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
              <option>UI/UX Designer</option>
              <option>Tester</option>
              <option>DevOps</option>
            </select>

            <button
              className="remove-btn"
              onClick={() =>
                deleteMember(member.user._id)
              }
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyTeam;