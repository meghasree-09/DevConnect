import api from "./api";

// Get all messages of a community
export const getMessages = async (communityId) => {
  const response = await api.get(`/chat/community/${communityId}`);
  return response.data;
};

// Send a message
export const sendMessage = async (chatData) => {
  const response = await api.post("/chat", chatData);
  return response.data;
};

// Delete a message
export const deleteMessage = async (id) => {
  const response = await api.delete(`/chat/${id}`);
  return response.data;
};