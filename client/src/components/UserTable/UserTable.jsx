import { Link } from "react-router-dom";
import "./UserTable.css";

function UserTable({
  users,
  deleteUser,
}) {
  return (
    <div className="table-container">
      <table className="user-table">

        <thead>
          <tr>
            <th>S.No</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="no-users"
              >
                No Users Registered
              </td>
            </tr>
          ) : (
            users.map(
              (user, index) => (
                <tr key={user._id}>

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {user.userName}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>
                    {user.phone}
                  </td>

                  <td>
                    {user.role}
                  </td>

                  <td className="action-buttons">

                    <Link
                      to={`/edit/${user._id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteUser(
                          user.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )
          )}

        </tbody>

      </table>
    </div>
  );
}

export default UserTable;