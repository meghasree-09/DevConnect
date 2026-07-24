import api from "./api";

// Create Notification
export const createNotification = async (notificationData) => {
  const response = await api.post(
    "/notifications",
    notificationData
  );

  return response.data;
};

// Get User Notifications
export const getUserNotifications = async (userId) => {
  const response = await api.get(
    `/notifications/${userId}`
  );

  return response.data;
};

// Mark Notification as Read
export const markNotificationAsRead = async (id) => {
  const response = await api.put(
    `/notifications/${id}`
  );

  return response.data;
};

// Delete Notification
export const deleteNotification = async (id) => {
  const response = await api.delete(
    `/notifications/${id}`
  );

  return response.data;
};