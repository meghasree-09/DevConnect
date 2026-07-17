import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register({
  users,
  setUsers,
}) {
  const navigate =
    useNavigate();

  const [studentName,
    setStudentName] =
    useState("");

  const [email,
    setEmail] =
    useState("");

  const [phone,
    setPhone] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [role,
    setRole] =
    useState("user");

  const [showPassword,
    setShowPassword]=
    useState("false");

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    // Check duplicate email
    const existingUser =
      users.find(
        (user) =>
          user.email ===
          email
      );

    if (existingUser) {
      alert(
        "Email already registered"
      );
      return;
    }

    const newUser = {
      id: Date.now(),
      studentName,
      email,
      phone,
      password,
    };

    const updatedUsers = [
        ...users,
        newUser,
      ];

      setUsers(updatedUsers);

      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );
      
    alert(
      "Registration Successful"
    );

    setStudentName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRole("user");
    setShowPassword(false);

    navigate("/login");
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
            value={
              studentName
            }
            onChange={(e) =>
              setStudentName(
                e.target
                  .value
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
                e.target
                  .value
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
                e.target
                  .value
              )
            }
            required
          />

          <input
            type={showPassword ? "text":"password"}
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


           {/* Role Selection */}

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
            className="link-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>

      </div>

    </div>
  );
}

export default Register;