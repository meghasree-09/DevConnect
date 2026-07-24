import "./ManageTasks.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  createTask,
  getProjectTasks,
  deleteTask,
} from "../../api/taskApi";

import { getTeamMembers } from "../../api/teamapi";
import { useAuth } from "../../context/AuthContext";

function ManageTasks() {
  const { projectId } = useParams();
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    loadTasks();
    loadTeamMembers();
  }, []);

  async function loadTasks() {
    try {
      const data = await getProjectTasks(projectId);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }
async function loadTeamMembers() {
  try {
    const data = await getTeamMembers(projectId);

    console.log("Team Members Response:", data);

    setTeamMembers(data.teamMembers || []);
  } catch (error) {
    console.log(error);
    setTeamMembers([]);
  }
}
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createTask({
        ...formData,
        projectId,
        assignedBy: user._id,
      });

      alert("Task Created Successfully");

      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        priority: "Medium",
        dueDate: "",
      });

      loadTasks();
    } catch (error) {
      console.log(error);
      alert("Failed to create task");
    }
  }

  async function handleDelete(taskId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(taskId);
      loadTasks();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="manage-task-page">

      <h1>Manage Tasks</h1>

      <form className="task-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          required
        >
          <option value="">Select Team Member</option>

          {Array.isArray(teamMembers) &&
  teamMembers.map((member) => (
    <option
      key={member.user._id}
      value={member.user._id}
    >
      {member.user.userName}
    </option>
  ))}
        </select>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Create Task
        </button>

      </form>

      <h2>Project Tasks</h2>

      {tasks.length === 0 ? (
        <p>No Tasks Available</p>
      ) : (
        <div className="task-list">

          {tasks.map((task) => (

            <div
              className="task-card"
              key={task._id}
            >

              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <p>
                <strong>Assigned To:</strong>{" "}
                {task.assignedTo?.userName}
              </p>

              <p>
                <strong>Priority:</strong>{" "}
                {task.priority}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {task.status}
              </p>

              <p>
                <strong>Due Date:</strong>{" "}
                {new Date(task.dueDate).toLocaleDateString()}
              </p>

              <button
                className="delete-btn"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default ManageTasks;