import "./Communities.css";
import {
  useEffect,
  useState,
} from "react";

import {
  getCommunities,
  joinCommunity,
  createCommunity,
} from "../../api/communityApi";

import {
  useAuth,
} from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

function Communities() {

  const { user } =
    useAuth();

   const navigate = useNavigate();
  const [
    communities,
    setCommunities,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    name,
    setName,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities =
    async () => {

      try {

        const data =
          await getCommunities();

        setCommunities(
          data
        );

      }
      catch (error) {

        console.log(error);

      }
      finally {

        setLoading(false);

      }
    };

  const handleAddCommunity =
    async (e) => {

      e.preventDefault();

    console.log(
      name,
      description);

      try {

        await createCommunity({

          name,
          description,

        });

        alert(
          "Community Added Successfully"
        );

        setName("");
        setDescription("");

        fetchCommunities();

      }
      catch (error) {

        console.log(error.response?.data);
        alert(error.response?.data?.message)

      }
    };

  const handleJoin =
    async (
      communityId
    ) => {

      if (!user) {

        alert(
          "Please Login First"
        );

        return;
      }

      try {

        await joinCommunity({

          communityId,
          userId:
            user._id,

        });

        alert(
          "Joined Successfully",
        );
        navigate(`/community/${communityId}`)

        fetchCommunities();

      }
      catch (error) {

        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.status);

        alert(
          error.response
            ?.data
            ?.message ||
          "Failed To Join"
        );

      }
    };

  if (loading) {

    return (
      <h2>
        Loading...
      </h2>
    );
  }

  return (

    <div className="communities-page">

      <h1>
        Developer Communities
      </h1>

      <p className="community-subtitle">
        Join communities, learn together,
        and collaborate with developers.
      </p>

      {/* Add Community */}

      <form
        className="community-form"
        onSubmit={
          handleAddCommunity
        }
      >

        <input
          type="text"
          placeholder="Community Name"
          value={name}
          onChange={(e)=>
            setName(
              e.target.value
            )
          }
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e)=>
            setDescription(
              e.target.value
            )
          }
        />

        <button
          type="submit"
        >
          Add Community
        </button>

      </form>
      
      <button
        className="joined-btn"
        onClick={() =>
          navigate("/joined-communities")
        }
      >
        View Joined Communities
      </button>

      <div className="community-container">

        {
          communities.length === 0
          ? (

            <h2>
              No Communities Found
            </h2>

          )
          : (

            communities.map(
              (
                community
              ) => (

                <div
                  key={
                    community._id
                  }
                  className="community-card"
                >

                  <h2>
                    {
                      community.name
                    }
                  </h2>

                  <p>
                    {
                      community.description
                    }
                  </p>

                  <p>

                    Members :
                    {
                      community
                        .members
                        ?.length || 0
                    }

                  </p>

                  <button
                    onClick={() =>
                      handleJoin(
                        community._id
                      )
                    }
                  >
                    Join Community
                  </button>

                </div>

              )
            )

          )
        }

      </div>

    </div>

  );
}

export default Communities;