import "./Developers.css";

import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import {
  getDevelopers,
  deleteDeveloper
} from "../../api/developerapi";

function Developers() {

  const [
    developers,
    setDevelopers
  ] = useState([]);

  useEffect(() => {

    fetchDevelopers();

  }, []);

  const fetchDevelopers =
    async () => {

      try {

        const response =
          await getDevelopers();

        setDevelopers(
          response.data
        );

      }
      catch (error) {

        console.log(error);

      }

    };
    const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this developer?"
  );

  if (!confirmDelete) return;

  try {
    await deleteDeveloper(id);

    alert("Developer deleted successfully");

    fetchDevelopers(); // Refresh developer list
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Delete failed"
    );
  }
};

  return (

    <div className="developers-page">

      <div className="developer-header">

        <h1>
          Our Developers
        </h1>

        <p className="developer-subtitle">

          Meet talented developers from our community.

        </p>

        <Link
          to="/create-developer"
        >

          <button
            className="create-developer-btn"
          >

            + Create Developer

          </button>

        </Link>

      </div>

      <div
        className=
        "developers-container"
      >

        {
          developers.map(
            (
              developer
            ) => (

              <div
                className=
                "developer-card"

                key={
                  developer._id
                }
              >

                <img
                  src={
                    developer.image ||

                    "https://dummyimage.com/200x200/2563eb/ffffff&text=Developer"
                  }

                  alt={
                    developer.name
                  }

                  className=
                  "developer-image"
                />

                <h2>
                  {
                    developer.name
                  }
                </h2>

                <p>

                  {
                    developer.role
                  }

                </p>

                <Link

                  to={
                    `/developer/${developer._id}`
                  }

                >

                  <button>

                    View Profile

                  </button>
                  <button
  className="delete-btn"
  onClick={() => handleDelete(developer._id)}
>
  Delete
</button>

                </Link>

              </div>

            )
          )
        }

      </div>

    </div>

  );

}

export default Developers;