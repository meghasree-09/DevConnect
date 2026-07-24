import api from "./api";

// Get all messages of a project
export const getProjectMessages = async (projectId) => {
  const response = await api.get(`/messages/${projectId}`);
  return response.data;
};

// Save a new message
export const sendMessage = async (messageData) => {
  const response = await api.post("/messages", messageData);
  return response.data;
};