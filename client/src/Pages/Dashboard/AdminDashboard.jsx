import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

import api from "../../api/api";

import "./Dashboard.css";

function AdminDashboard() {

  const navigate =
    useNavigate();

  const {
    user: admin,
    setUser,
  } = useAuth();

  const [
    users,
    setUsers,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers =
    async () => {

      try {

        const response =
          await api.get(
            "/users"
          );

        setUsers(
          response.data
        );

      }
      catch (error) {

        console.log(
          error
        );

      }
      finally {

        setLoading(
          false
        );

      }
    };

  const totalUsers =
    users.filter(
      (u) =>
        u.role ===
        "user"
    ).length;

  const totalLeads =
    users.filter(
      (u) =>
        u.role ===
        "projectLead"
    ).length;

  const handleLogout =
    () => {

      setUser(null);

      navigate(
        "/login"
      );
    };

  if (loading) {

    return (
      <h2>
        Loading...
      </h2>
    );
  }

  return (

    <div className="dashboard-page">

      <div className="dashboard-card">

        <div className="dashboard-header">

          <div>

            <h1>
              Welcome,
              {" "}
              {
                admin
                  ?.studentName
              }
            </h1>

            <p>
              Email :
              {" "}
              {
                admin?.email
              }
            </p>

            <p>
              Role :
              {" "}
              {
                admin?.role
              }
            </p>

          </div>

          <button
            className="logout-btn"
            onClick={
              handleLogout
            }
          >
            Logout
          </button>

        </div>

        {/* Statistics */}

        <div
          className="dashboard-grid"
        >

          <div
            className="dashboard-box"
          >
            <h2>
              Users
            </h2>

            <h1>
              {
                totalUsers
              }
            </h1>
          </div>

          <div
            className="dashboard-box"
          >
            <h2>
              Project Leads
            </h2>

            <h1>
              {
                totalLeads
              }
            </h1>
          </div>

          <div
            className="dashboard-box"
          >
            <h2>
              Total Members
            </h2>

            <h1>
              {
                users.length
              }
            </h1>
          </div>

        </div>

        {/* Navigation */}

        <div
          className="dashboard-grid"
          style={{
            marginTop:
              "40px",
          }}
        >

          <button
            type="button"
            className="dashboard-box"
            onClick={() =>
              navigate(
                "/users"
              )
            }
          >
            <h2>
              Manage Users
            </h2>

            <p>
              View, edit and
              delete users.
            </p>
          </button>

          <button
            type="button"
            className="dashboard-box"
            onClick={() =>
              navigate(
                "/projects"
              )
            }
          >
            <h2>
              Manage Projects
            </h2>

            <p>
              Monitor all
              projects.
            </p>
          </button>

          <button
            type="button"
            className="dashboard-box"
            onClick={() =>
              navigate(
                "/communities"
              )
            }
          >
            <h2>
              Communities
            </h2>

            <p>
              Manage community
              activities.
            </p>
          </button>

          <button
            type="button"
            className="dashboard-box"
            onClick={() =>
              navigate(
                "/developers"
              )
            }
          >
            <h2>
              Developers
            </h2>

            <p>
              View all
              developers.
            </p>
          </button>

        </div>

        {/* Users Table */}

        <div
          className="table-container"
        >

          <h2>
            Registered Users
          </h2>

          <table>

            <thead>

              <tr>

                <th>
                  Name
                </th>

                <th>
                  Email
                </th>

                <th>
                  Phone
                </th>

                <th>
                  Role
                </th>

              </tr>

            </thead>

            <tbody>

              {
                users.map(
                  (
                    user
                  ) => (

                    <tr
                      key={
                        user._id
                      }
                    >

                      <td>
                        {
                          user
                            .studentName
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
                        {
                          user.role
                        }
                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default
  AdminDashboard;