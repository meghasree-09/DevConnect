import api from "./api";

/* Upload Resource */

export const uploadResource = async (formData) => {
  const response = await api.post(
    "/resources",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/* Get Resources */

export const getResources = async (communityId) => {
  const response = await api.get(
    `/resources/${communityId}`
  );

  return response.data;
};

/* Delete Resource */

export const deleteResource = async (id) => {
  const response = await api.delete(
    `/resources/${id}`
  );

  return response.data;
};