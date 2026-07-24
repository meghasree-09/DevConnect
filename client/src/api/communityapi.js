import api from "./api";

export const getCommunities = async () => {

  const response = await api.get("/communities");

  return response.data;

};

export const createCommunity = async (community) => {

  const response = await api.post(
    "/communities",
    community
  );

  return response.data;

};

export const joinCommunity = async (data) => {

  const response = await api.post(
    "/communities/join",
    data
  );

  return response.data;

};

export const getCommunity = async (id) => {

  const response = await api.get(
    `/communities/${id}`
  );

  return response.data;

};

export const updateCommunity = async (id, data) => {

  const response = await api.put(
    `/communities/${id}`,
    data
  );

  return response.data;

};