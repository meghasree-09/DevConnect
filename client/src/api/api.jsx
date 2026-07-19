
import axios from "axios"
import React from "react";
const api = axios.create({
    baseURL:"http://localhost:8000"
});
export default api;
