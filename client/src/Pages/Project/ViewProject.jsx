import "./ViewProject.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import {
  Link,
  useParams,useNavigate
} from "react-router-dom";

import {
  getProject,
} from "../../api/projectApi";

import {
  createTeamRequest,
} from "../../api/teamRequestApi";

function ViewProject() {

  const { id } =
    useParams();
  const navigate=useNavigate();
  const {
    user,
  } = useAuth();

  const [
    project,
    setProject,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject =
    async () => {

      try {

        const data =
          await getProject(id);

        console.log(
          "Project : ",
          data
        );

        setProject(data);

      }
      catch (error) {

        console.log(error);

      }
      finally {

        setLoading(false);

      }
    };

  const handleRequest =
    async () => {

      try {

        console.log(
          "Logged User : ",
          user
        );

        console.log(
          "Project : ",
          project
        );

        if (!user) {

          alert(
            "Please login first"
          );

          return;
        }

        await createTeamRequest({

          projectId:
            project._id,

          userId:
            user._id,

        });

        alert(
          "Request Sent Successfully"
        );

      }
      catch (error) {

        console.log(
          error.response?.data
        );

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Failed to send request"
        );

      }
    };

  if (loading) {

    return (
      <h2 className="loading">
        Loading...
      </h2>
    );
  }

  if (!project) {

    return (
      <h2 className="loading">
        Project Not Found
      </h2>
    );
  }
  const isTeamMember = project?.teamMembers?.some(
  (member) =>
    member.user?._id?.toString() === user?._id?.toString()
);

const isProjectLead =
  project?.createdBy?._id?.toString() === user?._id?.toString();

  return (

    <div className="view-project-page">

      <div className="project-details-card">

        <h1 className="project-title">
          {project.title}
        </h1>

        <p className="project-description">
          {project.description}
        </p>

        <h3>
          Technologies Used
        </h3>

       <div className="tech-container">

    {
      project.technologies?.map(
        (tech, index) => (

          <span
            key={index}
            className="tech-badge"
          >
            {tech}
          </span>

        )
      )
    }

  </div>

  <h3>Team Members</h3>

  <div className="team-members">

    {project.teamMembers?.length === 0 ? (

      <p>No members yet.</p>

    ) : (

      project.teamMembers.map((member) => (

        <div
          key={member._id}
          className="member-card"
        >
      <h4>{member.user.userName}</h4>

      <p>{member.user.email}</p>

      <p>
        <strong>Role:</strong> {member.role}
      </p>

        </div>

      ))

    )}

  </div>



       {isProjectLead || isTeamMember ? (
  <button
    className="request-btn"
    onClick={() => navigate(`/chat/${project._id}`)}
  >
    Open Project Chat
  </button>
) : (
  <button
    className="request-btn"
    onClick={handleRequest}
  >
    Request To Join Team
  </button>
)}

        <Link
          to="/projects"
          className="back-btn"
        >
          Back To Projects
        </Link>

      </div>

    </div>

  );
}

export default ViewProject;