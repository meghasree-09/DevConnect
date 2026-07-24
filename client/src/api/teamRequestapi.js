import api from "./api";

// Create Team Request
export const createTeamRequest = async (data) => {
  const response = await api.post("/teamrequests", data);
  return response.data;
};

// Get All Team Requests
export const getTeamRequests = async (userId) => {

  const response = await api.get(
    `/teamrequests/${userId}`
  );

  return response.data;

};

// Update Request Status
export const updateTeamRequest = async (id, status) => {

  const response = await api.put(
    `/teamrequests/${id}`,
    { status }
  );

  return response.data;

};