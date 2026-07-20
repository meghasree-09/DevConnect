import "./CreateDeveloper.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeveloper } from "../../api/developerapi";

function CreateDeveloper() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [image, setImage] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await createDeveloper({

        name,
        role,
        bio,
        location,
        image,
        github,
        linkedin,
        portfolio,

        skills:
          skills
            .split(",")
            .map((skill) =>
              skill.trim()
            )

      });

      navigate("/developers");

    }
    catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="create-developer-page">

      <form
        className="create-developer-form"
        onSubmit={handleSubmit}
      >

        <h1>
          Create Developer
        </h1>

        <div className="form-group">

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label>Role</label>

          <input
            type="text"
            placeholder="Frontend Developer"
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label>Bio</label>

          <textarea
            placeholder="Tell about yourself..."
            value={bio}
            onChange={(e) =>
              setBio(
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label>Location</label>

          <input
            type="text"
            placeholder="Guntur"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label>Skills</label>

          <input
            type="text"
            placeholder="React, Node, MongoDB"
            value={skills}
            onChange={(e) =>
              setSkills(
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label>Profile Image URL</label>

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label>GitHub Link</label>

          <input
            type="text"
            value={github}
            onChange={(e) =>
              setGithub(
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label>LinkedIn Link</label>

          <input
            type="text"
            value={linkedin}
            onChange={(e) =>
              setLinkedin(
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label>Portfolio Link</label>

          <input
            type="text"
            value={portfolio}
            onChange={(e) =>
              setPortfolio(
                e.target.value
              )
            }
          />

        </div>

        <button
          className="create-btn"
        >
          Create Developer
        </button>

      </form>

    </div>

  );
}

export default CreateDeveloper;