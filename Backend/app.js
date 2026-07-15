import express from "express";

import userRoutes
from "./routes/userRoutes.js";

import logger 
from "./middleware/logger.js";


const app = express();

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send(
    "Welcome to DevConnect Backend"
  );
});

app.use(
  "/users",
  userRoutes
);

// Invalid Route
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found"
  });
});

app.listen(8000, () => {
  console.log(
    "Server Started"
  );
});