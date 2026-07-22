import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import api from "../../api/api";

import "./Login.css";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate =
    useNavigate();

  const {setUser,}=useAuth();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [showForgot,
    setShowForgot] =
    useState(false);

  const [newPassword,
    setNewPassword] =
    useState("");

  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const response =
          await api.post(
            "/users/login",
            {
              email,
              password,
            }
          );

        const user =
          response.data;

        setUser(user);

        console.log("Logged User:",user);


        alert(
          "Login Successful"
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
          "projectLead"
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
      catch (error) {
        alert(
          error.response
            ?.data
            ?.message ||
            "Invalid Credentials"
        );
      }
    };

  const handleForgotPassword =
    () => {
      if (!email) {
        alert(
          "Please enter email first"
        );

        return;
      }

      setShowForgot(
        true
      );
    };

  const handleUpdatePassword =
    async () => {
      if (
        !newPassword
      ) {
        alert(
          "Enter new password"
        );

        return;
      }

      try {
        const response =
          await api.put(
            "/users/forgot-password",
            {
              email,
              password:
                newPassword,
            }
          );

        alert(
          response.data
            .message
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
      }
      catch (error) {
        alert(
          error.response
            ?.data
            ?.message ||
            "Something went wrong"
        );
      }
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
              checked={
                showPassword
              }
              onChange={() =>
                setShowPassword(
                  !showPassword
                )
              }
            />

            <label>
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
                  checked={
                    showNewPassword
                  }
                  onChange={() =>
                    setShowNewPassword(
                      !showNewPassword
                    )
                  }
                />

                <label>
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

      </div>
    </div>
  );
}

export default Login;