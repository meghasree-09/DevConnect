import { useState } from "react";
import { uploadResource } from "../../api/resourceApi";
import "./CreateResource.css";

function CreateResource({
  communityId,
  userId,
  onCreated,
  onClose,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "document",
    link: "",
    file: null,
  });

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("type", form.type);
    formData.append("community", communityId);
    formData.append("uploadedBy", userId);

    if (form.link) {
      formData.append("link", form.link);
    }

    if (form.file) {
      formData.append("file", form.file);
    }

    try {
  await uploadResource(formData);

  alert("Resource uploaded successfully");

  onCreated();
  onClose();
} catch (err) {
  console.log(err.response?.data);
  alert(err.response?.data?.message || "Upload Failed");
}
  }

  return (
    <div className="resource-modal">
      <form
        className="resource-form"
        onSubmit={handleSubmit}
      >
        <h2>Upload Resource</h2>

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="document">Document</option>
          <option value="github">GitHub</option>
          <option value="video">Video</option>
          <option value="website">Website</option>
        </select>

        {form.type === "document" ? (
          <input
            type="file"
            name="file"
            onChange={handleChange}
            required
          />
        ) : (
          <input
            name="link"
            placeholder="Enter URL"
            onChange={handleChange}
            required
          />
        )}

        <button type="submit">
          Upload
        </button>

        <button
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateResource;