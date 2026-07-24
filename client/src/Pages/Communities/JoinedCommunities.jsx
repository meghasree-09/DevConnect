import "./JoinedCommunities.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCommunities } from "../../api/communityApi";

function JoinedCommunities() {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [joinedCommunities, setJoinedCommunities] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (user) {
      fetchJoinedCommunities();
    }

  }, [user]);

  const fetchJoinedCommunities = async () => {

    try {

      const data = await getCommunities();

      const joined = data.filter((community) =>

        community.members?.some((member) =>

          typeof member === "object"
            ? member._id === user._id
            : member === user._id

        )

      );

      setJoinedCommunities(joined);

    }
    catch (error) {

      console.log(error);

    }
    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <h2 className="loading">
        Loading...
      </h2>
    );

  }

  return (

    <div className="joined-page">

      <h1>Joined Communities</h1>

      <p className="joined-subtitle">
        Communities that you have joined.
      </p>

      <div className="joined-container">

        {joinedCommunities.length === 0 ? (

          <div className="empty-card">

            <h2>No Joined Communities</h2>

            <p>
              Join a community to see it here.
            </p>

          </div>

        ) : (

          joinedCommunities.map((community) => (

            <div
              key={community._id}
              className="joined-card"
            >

              <div className="joined-content">

                <h2>{community.name}</h2>

                <p>{community.description}</p>

                <p>
                  <strong>Members:</strong>{" "}
                  {community.members.length}
                </p>

              </div>

              <div className="button-group">

                <button
                  className="joined-btn"
                  disabled
                >
                  ✅ Joined
                </button>

                <button
                  className="view-btn"
                  onClick={() =>
                    navigate(`/community/${community._id}`)
                  }
                >
                  View Community
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default JoinedCommunities;