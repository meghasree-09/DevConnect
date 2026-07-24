import { useEffect, useState } from "react";
import "./Project.css";

import { useAuth } from "../../context/AuthContext";

import {
  getTeamRequests,
  updateTeamRequest,
} from "../../api/teamRequestApi";

function TeamRequests() {

  const { user } = useAuth();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user) {
      loadRequests();
    }

  }, [user]);

  async function loadRequests() {

    try {

      const data = await getTeamRequests(user._id);

      setRequests(data);

    }
    catch (error) {

      console.log(error);

    }
    finally {

      setLoading(false);

    }

  }

  async function handleStatus(id, status) {

    try {

      await updateTeamRequest(id, status);

      loadRequests();

    }
    catch (error) {

      console.log(error);

      alert("Failed to update request.");

    }

  }

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (

    <div className="project-page">

      <div className="project-card">

        <h1>Team Requests</h1>

        {requests.length === 0 ? (

          <p className="no-data">
            No Team Requests Found
          </p>

        ) : (

          requests.map((request) => (

            <div
              key={request._id}
              className="request-card"
            >

              <div className="request-header">

                <div>

                  <h2>
                    {request.userId?.userName}
                  </h2>

                  <p>
                    {request.userId?.email}
                  </p>

                </div>

                <span
                  className={`status ${request.status}`}
                >
                  {request.status}
                </span>

              </div>

              <div className="request-body">

                <h3>
                  {request.projectId?.title}
                </h3>

                <p>
                  {request.message}
                </p>

                <small>
                  Requested on{" "}
                  {new Date(
                    request.createdAt
                  ).toLocaleDateString()}
                </small>

              </div>

              {request.status === "pending" && (

                <div className="request-buttons">

                  <button
                    className="accept-btn"
                    onClick={() =>
                      handleStatus(
                        request._id,
                        "accepted"
                      )
                    }
                  >
                    Accept
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() =>
                      handleStatus(
                        request._id,
                        "rejected"
                      )
                    }
                  >
                    Reject
                  </button>

                </div>

              )}

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default TeamRequests;