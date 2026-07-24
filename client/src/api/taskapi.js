import api from "./api";

// Create Task
export const createTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

// Get all tasks of a project
export const getProjectTasks = async (projectId) => {
  const response = await api.get(`/tasks/project/${projectId}`);
  return response.data;
};

// Get tasks assigned to a user
export const getMyTasks = async (userId) => {
  const response = await api.get(`/tasks/user/${userId}`);
  return response.data;
};

// Update task status
export const updateTaskStatus = async (taskId, status) => {
  const response = await api.put(`/tasks/${taskId}`, { status });
  return response.data;
};

// Delete task
export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};