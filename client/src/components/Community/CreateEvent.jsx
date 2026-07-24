import { useState } from "react";
import { createEvent } from "../../api/eventapi";
import "./CreateEvent.css";

function CreateEvent({
  communityId,
  userId,
  onCreated,
  onClose,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    seats: 50,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.time ||
      !formData.location
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!communityId) {
      alert("Community ID not found.");
      console.error("Community ID:", communityId);
      return;
    }

    if (!userId) {
      alert("User ID not found.");
      console.error("User ID:", userId);
      return;
    }

    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      seats: Number(formData.seats),
      community: communityId,
      createdBy: userId,
    };

    console.log("Sending Event:", eventData);

    try {
      setLoading(true);

      await createEvent(eventData);

      alert("Event Created Successfully");

      onCreated();

      onClose();
    } catch (error) {
      console.error(error);

      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
          "Failed to create event"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="event-modal">
      <form className="event-form" onSubmit={handleSubmit}>
        <h2>Create Event</h2>

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="seats"
          min="1"
          value={formData.seats}
          onChange={handleChange}
        />

        <div className="buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-btn"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;