import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Homepage from "./Pages/Homepage/Homepage";
import Features from "./Pages/Features/Features";
import Projects from "./Pages/Projects/Projects";
import Communities from "./Pages/Communities/Communities";
import Developers from "./Pages/Developers/Developers";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Users from "./Pages/Users/Users.jsx";
import EditUser from "./Pages/EditUser/EditUser.jsx";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import UserDashboard from "./Pages/Dashboard/UserDashboard";
import LeadDashboard from "./Pages/Dashboard/LeadDashboard";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import CreateProjects from "./Pages/Project/CreateProjects";
import ManageProjects from "./Pages/Project/ManageProjects";
import TeamRequests from "./Pages/Project/TeamRequests";
import DeveloperProfile from "./Pages/Developers/DeveloperProfile.jsx";
import CreateDeveloper from "./Pages/Developers/CreateDeveloper.jsx";
function App() {
  const [users, setUsers] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const storedUsers =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    setUsers(storedUsers);
  }, []);

  // Save data whenever users changes
  useEffect(() => {
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );
  }, [users]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Homepage />}
      />

      <Route
        path="/features"
        element={<Features />}
      />

      <Route
        path="/projects"
        element={<Projects />}
      />

      {/* <Route
        path="/projects/:id"
        element={<ViewProject />}
      /> */}

      <Route
        path="/communities"
        element={<Communities />}
      />

      <Route
        path="/developers"
        element={<Developers />}
      />

      <Route
        path="/developer/:id"
        element={<DeveloperProfile/>}
      />

      <Route
        path="/create-developer"
        element={<CreateDeveloper />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/login"
        element={
          <Login users={users}
          setUsers={setUsers} />
        }
      />

      <Route
        path="/register"
        element={
          <Register
            users={users}
            setUsers={setUsers}
          />
        }
      />

      <Route
        path="/users"
        element={
          <Users
            users={users}
            setUsers={setUsers}
          />
        }
      />
      <Route
        path="/user"
        element={<UserDashboard />}
      />

      <Route
        path="/lead"
        element={<LeadDashboard />}
      />

      <Route
        path="/admin"
        element={<AdminDashboard />}
      />

      <Route
        path="/create-project"
        element={
          <CreateProjects  />
        }
      />


      <Route
        path="/manage-projects"
        element={
          <ManageProjects />
        }
      />

      <Route
        path="/team-requests"
        element={
          <TeamRequests />
        }
      />

      <Route
        path="/edit/:id"
        element={
          <EditUser
            users={users}
            setUsers={setUsers}
          />
        }
      />

      <Route
        path="*"
        element={<ErrorPage />}
      />
    </Routes>
  );
}

export default App;