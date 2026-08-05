import api from "./api";

export const createBugReport = (data) =>
  api.post("/api/bug-reports", data);

export const getBugReports = () =>
  api.get("/api/bug-reports");

export const updateBugStatus = (id, status) =>
  api.put(`/api/bug-reports/${id}`, {
    status,
  });