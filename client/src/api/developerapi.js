import axios from "axios";

const API =
axios.create({

baseURL:
"http://localhost:8000/developers"

});

export const getDevelopers =
()=>
API.get("/");

export const getDeveloper =
(id)=>
API.get(`/${id}`);

export const createDeveloper =
(data)=>
API.post("/",data);