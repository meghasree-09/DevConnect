import { useEffect, useState } from "react";
import UserTable from "../../components/UserTable/UserTable";
import api from "../../api/api"; // change path if needed
import "./Users.css";

function Users() {
  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  async function fetchUsers() {
    try {
      setLoading(true);

      const response =
        await api.get("/users");

      // If backend returns:
      // res.json({ users })

      setUsers(
        response.data.users
      );

      console.log(
        response.data.users
      );
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  async function deleteUser(id) {
    try {
      await api.delete(
        `/users/${id}`
      );

      setUsers(
        users.filter(
          (user) =>
            user._id !== id
        )
      );

      alert(
        "User Deleted Successfully"
      );
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <h2 className="loading-text">
        Loading Users...
      </h2>
    );
  }

  return (
    <div className="users-container">

      <h1 className="users-title">
        Users
      </h1>

      <UserTable
        users={users}
        deleteUser={
          deleteUser
        }
      />

    </div>
  );
}

export default Users;