import api from "./api";

export const createTeamRequest =
  async (data) => {

    const response =
      await api.post(
        "/teamrequests",
        data
      );

    return response.data;

};

export const getTeamRequests =
  async () => {

    const response =
      await api.get(
        "/teamrequests"
      );

    return response.data;

};