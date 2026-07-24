import "./MyTasks.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getMyTasks,
  updateTaskStatus,
} from "../../api/taskApi";

function MyTasks() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await getMyTasks(user._id);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleStatusChange(taskId, status) {
    try {
      await updateTaskStatus(taskId, status);
      loadTasks();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="my-tasks-page">
      <h1>My Tasks</h1>

      {tasks.length === 0 ? (
        <p>No Tasks Assigned</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <h2>{task.title}</h2>

              <p>{task.description}</p>

              <p>
                <strong>Project:</strong>{" "}
                {task.projectId?.projectName}
              </p>

              <p>
                <strong>Priority:</strong>{" "}
                {task.priority}
              </p>

              <p>
                <strong>Due Date:</strong>{" "}
                {new Date(task.dueDate).toLocaleDateString()}
              </p>

              <select
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(
                    task._id,
                    e.target.value
                  )
                }
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTasks;