import { Routes, Route } from "react-router-dom";

import Homepage from "./Pages/Homepage/Homepage";
import Features from "./Pages/Features/Features";
import Projects from "./Pages/Projects/Projects";
import Communities from "./Pages/Communities/Communities";
import JoinedCommunities from "./Pages/Communities/JoinedCommunities";
import CommunityDetails from "./Pages/Communities/CommunityDetails";
import UserProfile from "./Pages/Users/UserProfile";
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
import ProjectChat from "./Pages/Chat/ProjectChat";
import CreateProjects from "./Pages/Project/CreateProjects";
import ManageProjects from "./Pages/Project/ManageProjects";
import ViewProject from "./Pages/Project/ViewProject";
import TeamRequests from "./Pages/Project/TeamRequests";
import ManageTasks from "./Pages/Project/ManageTasks";
import Notifications from "./Pages/Notifications/Notifications";
import MyTasks from "./Pages/Project/MyTasks";
import MyTeam from "./Pages/Project/MyTeam";

import ProtectedRoute from "./components/ProtecedRoute";

import ErrorPage from "./Pages/ErrorPage/ErrorPage";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Homepage />} />
      <Route path="/features" element={<Features />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/communities" element={<Communities />} />
      <Route path="/joined-communities" element={<JoinedCommunities />} />
      <Route path="/community/:id" element={<CommunityDetails />} />
      <Route path="/developers" element={<Developers />} />
      <Route path="/developer/:id" element={<DeveloperProfile />} />
      <Route path="/create-developer" element={<CreateDeveloper />} />
      <Route path="/contact" element={<Contact />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Users */}
      <Route path="/users" element={<Users />} />
      <Route path="/edit/:id" element={<EditUser />} />

      {/* Dashboards */}

      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      

      <Route
        path="/lead"
        element={
          <ProtectedRoute role="projectLead">
            <LeadDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Projects */}

      <Route
        path="/create-project"
        element={
          <ProtectedRoute role="projectLead">
            <CreateProjects />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manage-projects"
        element={
          <ProtectedRoute role="projectLead">
            <ManageProjects />
          </ProtectedRoute>
        }
      />
      <Route path="/tasks/:projectId" element={<ManageTasks />} />
      <Route path="/chat/:projectId" element={<ProjectChat />} />
      <Route path="/my-tasks" element={<MyTasks />} />
      <Route path="/projects/:id" element={<ViewProject />} />

      <Route
        path="/team/:projectId"
        element={
          <ProtectedRoute role="projectLead">
            <MyTeam />
          </ProtectedRoute>
        }
      />

      <Route
        path="/team-requests"
        element={
          <ProtectedRoute role="projectLead">
            <TeamRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={<Notifications />}
      />

      {/* Error */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;