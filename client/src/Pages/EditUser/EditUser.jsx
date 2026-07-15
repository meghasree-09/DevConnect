import { useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import "./EditUser.css";

function EditUser({
  users,
  setUsers,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = users.find(
    (u) => u.id === Number(id)
  );

  const [studentName,
    setStudentName] =
    useState(
      user?.studentName || ""
    );

  const [email,
    setEmail] =
    useState(
      user?.email || ""
    );

  const [phone,
    setPhone] =
    useState(
      user?.phone || ""
    );

  const [password,
    setPassword] =
    useState(
      user?.password || ""
    );

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedUsers =
      users.map((u) =>
        u.id === Number(id)
          ? {
              ...u,
              studentName,
              email,
              phone,
              password,
            }
          : u
      );

    setUsers(updatedUsers);

    alert(
      "User Updated Successfully"
    );

    navigate("/users");
  };

  return (
    <div className="edit-page">

      <div className="edit-container">

        <h1>Edit User</h1>

        <form
          className="edit-form"
          onSubmit={handleUpdate}
        >

          <input
            type="text"
            placeholder="Enter Name"
            value={studentName}
            onChange={(e) =>
              setStudentName(
                e.target.value
              )
            }
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            type="text"
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button
            type="submit"
            className="update-btn"
          >
            Update User
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              navigate("/users")
            }
          >
            Cancel
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditUser;