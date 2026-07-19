import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({
  users,
  setUsers,
}) {
  console.log(users);

  const navigate =
    useNavigate();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loggedIn,
    setLoggedIn] =
    useState(false);

  const [showForgot,
    setShowForgot] =
    useState(false);

  const [newPassword,
    setNewPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [showNewPassword,
    setShowNewPassword] =
    useState(false);

  // Login

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    const user =
      users.find(
        (u) =>
          u.email ===
            email &&
          u.password ===
            password
      );

    if (user) {
      alert(
        "Login Successful"
      );

      setLoggedIn(true);

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );

      if (
        user.role ===
        "admin"
      ) {
        navigate(
          "/admin"
        );
      }
      else if (
        user.role ===
        "lead"
      ) {
        navigate(
          "/lead"
        );
      }
      else {
        navigate(
          "/user"
        );
      }
    }
    else {
      alert(
        "Invalid Credentials"
      );
    }
  };

  // Forgot Password

  const handleForgotPassword =
    () => {
      if (!email) {
        alert(
          "Please enter your email first."
        );
        return;
      }

      const user =
        users.find(
          (u) =>
            u.email ===
            email
        );

      if (!user) {
        alert(
          "Email not registered."
        );
        return;
      }

      setShowForgot(
        true
      );
    };

  // Update Password

  const handleUpdatePassword =
    () => {
      if (!newPassword) {
        alert(
          "Please enter new password."
        );
        return;
      }

      const updatedUsers =
        users.map(
          (u) =>
            u.email ===
            email
              ? {
                  ...u,
                  password:
                    newPassword,
                }
              : u
        );

      setUsers(
        updatedUsers
      );

      localStorage.setItem(
        "users",
        JSON.stringify(
          updatedUsers
        )
      );

      alert(
        "Password Updated Successfully"
      );

      setPassword(
        newPassword
      );

      setNewPassword(
        ""
      );

      setShowForgot(
        false
      );
    };

  return (
    <div className="login-page">

      <div className="login-container">

        <h1>
          Welcome Back
        </h1>

        <p className="subtitle">
          Login to your
          DevConnect account
        </p>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target
                  .value
              )
            }
            required
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter Password"
            value={
              password
            }
            onChange={(e) =>
              setPassword(
                e.target
                  .value
              )
            }
            required
          />

          <div className="show-password">
            <input
              type="checkbox"
              id="showPassword"
              checked={
                showPassword
              }
              onChange={() =>
                setShowPassword(
                  !showPassword
                )
              }
            />

            <label
              htmlFor="showPassword"
            >
              Show Password
            </label>
          </div>

          <button
            type="button"
            className="forgot-btn"
            onClick={
              handleForgotPassword
            }
          >
            Forgot Password?
          </button>

          {showForgot && (
            <div className="forgot-box">

              <input
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter New Password"
                value={
                  newPassword
                }
                onChange={(e) =>
                  setNewPassword(
                    e.target
                      .value
                  )
                }
              />

              <div className="show-password">
                <input
                  type="checkbox"
                  id="showNewPassword"
                  checked={
                    showNewPassword
                  }
                  onChange={() =>
                    setShowNewPassword(
                      !showNewPassword
                    )
                  }
                />

                <label
                  htmlFor="showNewPassword"
                >
                  Show Password
                </label>
              </div>

              <button
                type="button"
                className="update-btn"
                onClick={
                  handleUpdatePassword
                }
              >
                Update Password
              </button>

            </div>
          )}

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <p className="register-text">
          Not Registered Yet?
        </p>

        <button
          className="register-link"
          onClick={() =>
            navigate(
              "/register"
            )
          }
        >
          Register Here
        </button>

        {loggedIn && (
          <div className="table-container">

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

                {users.map(
                  (
                    user
                  ) => (
                    <tr
                      key={
                        user.id
                      }
                    >
                      <td>
                        {
                          user.userName
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
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default Login;