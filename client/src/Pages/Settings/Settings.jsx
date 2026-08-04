import "./Settings.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

function Settings() {

  const navigate = useNavigate();
  const { user } = useAuth();

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    teamRequestNotifications: true,
    publicProfile: true,
    showEmail: false,
    showPhone: false,
    theme: "dark",
    language: "English",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {

    try {

      const response = await api.get(`/settings/${user._id}`);

      if (response.data) {
        setSettings(response.data);
      }

    } catch (error) {
      console.log(error);
    }

  };

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.put(
        `/settings/${user._id}`,
        settings
      );

      alert("Settings Updated Successfully");

    } catch (error) {

      console.log(error);

      alert("Unable to update settings");

    }

  };

  return (

    <div className="settings-page">

      <div className="settings-card">

        <div className="settings-header">

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>

          <h1>Settings</h1>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="setting-group">

            <h2>Account</h2>

            <div className="readonly">

              <label>Name</label>

              <input
                value={user.userName}
                readOnly
              />

            </div>

            <div className="readonly">

              <label>Email</label>

              <input
                value={user.email}
                readOnly
              />

            </div>

          </div>

          <div className="setting-group">

            <h2>Notifications</h2>

            <label>

              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
              />

              Email Notifications

            </label>

            <label>

              <input
                type="checkbox"
                name="pushNotifications"
                checked={settings.pushNotifications}
                onChange={handleChange}
              />

              Push Notifications

            </label>

            <label>

              <input
                type="checkbox"
                name="teamRequestNotifications"
                checked={settings.teamRequestNotifications}
                onChange={handleChange}
              />

              Team Request Notifications

            </label>

          </div>

          <div className="setting-group">

            <h2>Privacy</h2>

            <label>

              <input
                type="checkbox"
                name="publicProfile"
                checked={settings.publicProfile}
                onChange={handleChange}
              />

              Public Profile

            </label>

            <label>

              <input
                type="checkbox"
                name="showEmail"
                checked={settings.showEmail}
                onChange={handleChange}
              />

              Show Email

            </label>

            <label>

              <input
                type="checkbox"
                name="showPhone"
                checked={settings.showPhone}
                onChange={handleChange}
              />

              Show Phone

            </label>

          </div>

          <div className="setting-group">

            <h2>Language</h2>

            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
            >

              <option>English</option>

              <option>Telugu</option>

              <option>Hindi</option>

            </select>

          </div>

          <button
            type="submit"
            className="save-btn"
          >

            <FaSave />

            Save Settings

          </button>

        </form>

      </div>

    </div>

  );

}

export default Settings;