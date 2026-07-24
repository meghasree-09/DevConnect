import api from "./api";

export const getDevelopers = () =>
  api.get("/developers");

export const getDeveloper = (id) =>
  api.get(`/developers/${id}`);

export const createDeveloper = (data) =>
  api.post("/developers", data);
export const deleteDeveloper = (id) =>
  api.delete(`/developers/${id}`);