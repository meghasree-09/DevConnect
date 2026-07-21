import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import api from "../../api/api";

function Register() {

  const navigate = useNavigate();

  const [userName, setUserName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("user");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/users",
          {
            userName,
            email,
            phone,
            password,
            role
          }
        );

        alert(
          "Registration Successful"
        );

        setUserName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setRole("user");
        setShowPassword(false);

        navigate("/login");

      }
      catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Registration Failed"
        );

      }

    };

  return (

    <div className="register-page">

      <div className="register-container">

        <h1>
          Register
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <input
            type="text"
            placeholder="Enter Name"
            value={userName}
            onChange={(e) =>
              setUserName(
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
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <div
            className=
            "show-password"
          >

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
              htmlFor=
              "showPassword"
            >
              Show Password
            </label>

          </div>

          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
            required
          >

            <option value="user">
              User
            </option>

            <option value="projectLead">
              Project Lead
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          <button
            type="submit"
          >
            Register
          </button>

        </form>

        <p>

          Already have an account?

          <button
            type="button"
            className=
            "link-button"
            onClick={() =>
              navigate(
                "/login"
              )
            }
          >

            Login

          </button>

        </p>

      </div>

    </div>

  );
}

export default Register;