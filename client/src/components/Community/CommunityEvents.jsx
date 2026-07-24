import { useEffect, useState } from "react";
import "./CommunityEvents.css";

import {
  getEvents,
  registerEvent,
  deleteEvent,
} from "../../api/eventapi";

import CreateEvent from "./CreateEvent";
import { useAuth } from "../../context/AuthContext";

function CommunityEvents({ communityId }) {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (communityId) {
      loadEvents();
    }
  }, [communityId]);

  async function loadEvents() {
    try {
      const data = await getEvents(communityId);
      setEvents(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRegister(eventId) {
    try {
      await registerEvent(eventId, user._id);
      loadEvents();
    } catch (err) {
      console.log("Status:", err.response?.status);
      console.log("Data:", err.response?.data);
      alert(err.response?.data?.message);
    }
  }

  async function handleDelete(eventId) {
    try {
      await deleteEvent(eventId);
      loadEvents();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message);
    }
  }

  return (
    <div className="community-events">
      <div className="events-header">
        <h2>Community Events</h2>

        <button
          className="create-event-btn"
          onClick={() => setShowForm(true)}
        >
          + Create Event
        </button>
      </div>

      <div className="events-grid">
        {events.length === 0 ? (
          <h3>No Events Available</h3>
        ) : (
          events.map((event) => {
            const isRegistered = event.registeredUsers?.some(
              (id) => id.toString() === user?._id
            );

            return (
              <div className="event-card" key={event._id}>
                <div className="event-date">
                  <span>{new Date(event.date).getDate()}</span>

                  <small>
                    {new Date(event.date).toLocaleString("default", {
                      month: "short",
                    })}
                  </small>
                </div>

                <div className="event-content">
                  <h3>{event.title}</h3>

                  <p>{event.description}</p>

                  <p>
                    <strong>Time:</strong> {event.time}
                  </p>

                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>

                  <p>
                    <strong>Seats:</strong> {event.seats}
                  </p>

                  <div className="event-buttons">
                    {isRegistered ? (
                      <button
                        className="registered-btn"
                        disabled
                      >
                        ✓ Registered
                      </button>
                    ) : (
                      <button
                        className="register-btn"
                        onClick={() =>
                          handleRegister(event._id)
                        }
                      >
                        Register
                      </button>
                    )}

                    {(user?.role === "admin" ||
                      event.createdBy?._id === user?._id) && (
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(event._id)
                        }
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showForm && (
        <CreateEvent
          communityId={communityId}
          userId={user?._id}
          onCreated={loadEvents}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default CommunityEvents;