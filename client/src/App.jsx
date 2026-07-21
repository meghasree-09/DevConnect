import { Routes, Route } from "react-router-dom";

import Homepage from "./Pages/Homepage/Homepage";
import Features from "./Pages/Features/Features";
import Projects from "./Pages/Projects/Projects";
import Communities from "./Pages/Communities/Communities";
import Developers from "./Pages/Developers/Developers";
import DeveloperProfile from "./Pages/Developers/DeveloperProfile";
import CreateDeveloper from "./Pages/Developers/CreateDeveloper";
import Contact from "./Pages/Contact/Contact";

import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import Users from "./Pages/Users/Users";
import EditUser from "./Pages/EditUser/EditUser";

import UserDashboard from "./Pages/Dashboard/UserDashboard";
import LeadDashboard from "./Pages/Dashboard/LeadDashboard";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";

import CreateProjects from "./Pages/Project/CreateProjects";
import ManageProjects from "./Pages/Project/ManageProjects";
import ViewProject from "./Pages/Project/ViewProject";
import TeamRequests from "./Pages/Project/TeamRequests";

import ErrorPage from "./Pages/ErrorPage/ErrorPage";

function App() {
  return (
    <Routes>
      {/* Home */}
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
        element={<DeveloperProfile />}
      />

      <Route
        path="/create-developer"
        element={<CreateDeveloper />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      {/* Authentication */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Users */}
      <Route
        path="/users"
        element={<Users />}
      />

      <Route
        path="/edit/:id"
        element={<EditUser />}
      />

      {/* Dashboards */}
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

      {/* Projects */}
      <Route
        path="/create-project"
        element={<CreateProjects />}
      />

      <Route
        path="/manage-projects"
        element={<ManageProjects />}
      />

      <Route
        path="/projects/:id"
        element={<ViewProject />}
      />


      <Route
        path="/team-requests"
        element={<TeamRequests />}
      />

      {/* Error Page */}
      <Route
        path="*"
        element={<ErrorPage />}
      />
    </Routes>
  );
}

export default App;