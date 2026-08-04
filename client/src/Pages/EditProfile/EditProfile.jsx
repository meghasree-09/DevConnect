import "./EditProfile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

import {
  FaUserCircle,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

function EditProfile() {

  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    portfolio: "",
    profileImage: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        skills: user.skills
          ? user.skills.join(", ")
          : "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        portfolio: user.portfolio || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.put(`/users/${user._id}`, {
        ...formData,
        skills: formData.skills
          .split(",")
          .map(skill => skill.trim()),
      });

      alert("Profile Updated Successfully");

      navigate("/user/profile");

    } catch (error) {

      console.log(error);

      alert("Unable to update profile");

    }

  };

  return (

    <div className="edit-profile-page">

      <div className="edit-card">

        <div className="edit-header">

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>

          <h1>Edit Profile</h1>

        </div>

        <div className="avatar-section">

          {formData.profileImage ? (

            <img
              src={formData.profileImage}
              alt="Profile"
            />

          ) : (

            <FaUserCircle />

          )}

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div>

              <label>Name</label>

              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>Phone</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />

            </div>

          </div>

          <label>Bio</label>

          <textarea
            rows="4"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />

          <label>Skills (comma separated)</label>

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />

          <label>GitHub</label>

          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />

          <label>LinkedIn</label>

          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />

          <label>Portfolio</label>

          <input
            type="text"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="save-btn"
          >
            <FaSave />
            Save Changes
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditProfile;