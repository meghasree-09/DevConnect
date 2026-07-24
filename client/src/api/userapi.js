import api from "./api";

// Get all users
export const getUsers = () =>
  api.get("/users");

// Get single user
export const getUser = (id) =>
  api.get(`/users/${id}`);

// Add user
export const addUser = (data) =>
  api.post("/users", data);

// Login
export const loginUser = (data) =>
  api.post("/users/login", data);

// Update user
export const updateUser = (id, data) =>
  api.put(`/users/${id}`, data);

// Delete user
export const deleteUser = (id) =>
  api.delete(`/users/${id}`);

// Forgot password
export const forgotPassword = (data) =>
  api.put("/users/forgot-password", data);