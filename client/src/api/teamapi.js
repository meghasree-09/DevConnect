import api from "./api";

// Get Team Members
export const getTeamMembers = async (projectId) => {
  const response = await api.get(`/team/${projectId}`);
  return response.data;
};

// Update Member Role
export const updateMemberRole = async (
  projectId,
  memberId,
  role
) => {
  const response = await api.put(
    `/team/role/${projectId}/${memberId}`,
    { role }
  );

  return response.data;
};

// Remove Member
export const removeMember = async (
  projectId,
  memberId
) => {
  const response = await api.delete(
    `/team/${projectId}/${memberId}`
  );

  return response.data;
};