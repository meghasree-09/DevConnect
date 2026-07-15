import './Users.css'
import { useNavigate } from "react-router-dom";

function Users({
  users,
  setUsers,
}) {
  const navigate =
    useNavigate();

  const handleDelete = (
    id
  ) => {
    const updatedUsers =
      users.filter(
        (user) =>
          user.id !== id
      );

    setUsers(updatedUsers);
  };

  return (
    <div className="users-page">

      <h1>
        Registered Users
      </h1>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map(
            (user) => (
              <tr
                key={user.id}
              >
                <td>
                  {
                    user.studentName
                  }
                </td>

                <td>
                  {
                    user.email
                  }
                </td>

                <td>
                  {
                    user.phone
                  }
                </td>

                <td>

                 <button
                    className="edit-btn"
                    onClick={() =>
                        navigate(`/edit/${user.id}`)
                    }
                    >
                    Edit
                </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        user.id
                      )
                    }
                  >
                    Delete
                  </button>

                </td>
              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Users;