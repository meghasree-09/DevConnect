import "./UserProfile.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

function UserProfile() {

  const { id } = useParams();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {

    try {

      const response = await api.get(`/users/${id}`);

      console.log(response.data);

      setUser(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <h2>User Not Found</h2>;
  }

  return (

  <div className="user-profile">

    <div className="profile-card">

      <div className="profile-header">

        <div className="profile-avatar">
          {user.userName?.charAt(0).toUpperCase()}
        </div>

        <h1 className="profile-name">
          {user.userName}
        </h1>

        <span className="role-badge">
          {user.role}
        </span>

      </div>

      <div className="profile-details">

        <div className="detail-row">
          <span className="detail-title">📧 Email</span>
          <span className="detail-value">{user.email}</span>
        </div>

        <div className="detail-row">
          <span className="detail-title">📱 Phone</span>
          <span className="detail-value">{user.phone}</span>
        </div>

      </div>

      <button
        className="back-btn"
        onClick={() => window.history.back()}
      >
        ← Back to Community
      </button>

    </div>

  </div>

);
}

export default UserProfile;