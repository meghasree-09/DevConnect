import { useEffect, useState } from "react";
import UserTable from "../../components/UserTable/UserTable";
import api from "../../api/api";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/users");

      console.log(
        "Users Data : ",
        response.data
      );

      setUsers(
        Array.isArray(
          response.data
        )
          ? response.data
          : []
      );
    }
    catch (error) {
      console.log(
        "Fetch Error : ",
        error
      );
    }
    finally {
      setLoading(false);
    }
  };

  const deleteUser =
    async (id) => {
      try {
        console.log(
          "Deleting User : ",
          id
        );

        await api.delete(
          `/users/${id}`
        );

        setUsers(
          (prevUsers) =>
            prevUsers.filter(
              (user) =>
                user._id !== id
            )
        );

        alert(
          "User Deleted Successfully"
        );
      }
      catch (error) {
        console.log(
          "Delete Error : ",
          error
        );

        alert(
          "Failed to delete user"
        );
      }
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(
    "Users State : ",
    users
  );

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