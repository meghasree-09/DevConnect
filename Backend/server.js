import express from "express";
import userRoutes from "./routes/userRoutes.js";
import developerRoutes from "./routes/developerRoutes.js"
import teamRequestRoutes from "./routes/teamRequestRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import logger from "./middleware/logger.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();


const app = express();
app.use(cors());

connectDB();

app.use(express.json());
app.use(logger);


// app.get("/", (req, res) => {
//   res.send(
//     "Welcome to DevConnect Backend"
//   );
// });

app.use(
  "/users",
  userRoutes
);

app.use("/developers",developerRoutes)

app.use(
  "/teamrequests",
  teamRequestRoutes
);

app.use("/projects", projectRoutes);


// app.use((req, res) => {
//   res.status(404).json({
//     message: "Route Not Found"
//   });
// });

app.listen(8000, () => {
  console.log(
    "Server is  Started at 8000"
  );
});