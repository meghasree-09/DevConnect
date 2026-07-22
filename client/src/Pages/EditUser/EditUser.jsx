import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import api from "../../api/api";
import "./EditUser.css";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] =
    useState(null);

  const [userName, setUserName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [role, setRole] =
    useState("user");

  useEffect(() => {
    fetchUser();
  }, [id]);

  async function fetchUser() {
    try {
      console.log("ID :", id);

      const response =
        await api.get(
          `/users/${id}`
        );

      console.log(
        response.data
      );

      const userData =
        response.data;

      setUser(userData);

      setUserName(
        userData.userName || ""
      );

      setEmail(
        userData.email || ""
      );

      setPhone(
        userData.phone || ""
      );

      setRole(
        userData.role || "user"
      );
    }
    catch (error) {
      console.log(error);
    }
  }

  if (!user) {
    return <h2>Loading...</h2>;
  }

  async function handleSubmit(
    e
  ) {
    e.preventDefault();

    try {
      await api.put(
        `/users/${id}`,
        {
          userName,
          email,
          phone,
          role,
        }
      );

      alert(
        "User Updated Successfully"
      );

      navigate("/users");
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="edit-user-container">
      <div className="edit-user-card">

        <h2>Edit User</h2>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="form-group">
            <label>
              User Name
            </label>

            <input
              type="text"
              value={userName}
              onChange={(e) =>
                setUserName(
                  e.target.value
                )
              }
              required
            />
          </div>

          <div className="form-group">
            <label>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />
          </div>

          <div className="form-group">
            <label>
              Phone
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Role
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
            >
              <option value="user">
                User
              </option>

              <option value="lead">
                Lead
              </option>

              <option value="admin">
                Admin
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="update-btn"
          >
            Update User
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditUser;