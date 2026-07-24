import { useState } from "react";
import { updateCommunity } from "../../api/communityapi";
import "./EditCommunity.css";

function EditCommunity({ community, onUpdated }) {
  const [formData, setFormData] = useState({
    name: community.name || "",
    description: community.description || "",
    category: community.category || "",
    technologies: community.technologies?.join(", ") || "",
    rules: community.rules?.join(", ") || "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        rules: formData.rules
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const updatedCommunity = await updateCommunity(
        community._id,
        data
      );

      onUpdated(updatedCommunity);

      alert("Community Updated Successfully!");

    } catch (error) {
      console.log(error);
      alert("Failed to update community");
    }
  }

  return (
    <form className="edit-community" onSubmit={handleSubmit}>

      <h2>✏ Edit Community</h2>

      <div className="form-group">
        <label>Community Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Community Name"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>

        <textarea
          name="description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          placeholder="Community Description"
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Full Stack">Full Stack</option>
          <option value="AI / ML">AI / ML</option>
          <option value="Cloud">Cloud</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="DevOps">DevOps</option>
          <option value="Mobile Development">Mobile Development</option>
          <option value="General">General</option>
        </select>
      </div>

      <div className="form-group">
        <label>Technologies</label>

        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="React, Node.js, MongoDB"
        />
      </div>

      <div className="form-group">
        <label>Community Rules</label>

        <textarea
          rows="4"
          name="rules"
          value={formData.rules}
          onChange={handleChange}
          placeholder="Rule 1, Rule 2, Rule 3"
        />
      </div>

      <div className="button-group">

        <button
          type="button"
          className="cancel-btn"
          onClick={() => onUpdated(community)}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="save-btn"
        >
          💾 Save Changes
        </button>

      </div>

    </form>
  );
}

export default EditCommunity;