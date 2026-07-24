import express from "express";
import userRoutes from "./routes/userRoutes.js";
import developerRoutes from "./routes/developerRoutes.js"
import teamRequestRoutes from "./routes/teamRequestRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import logger from "./middleware/logger.js";
import connectDB from "./config/db.js";
import communityRoutes from "./routes/communityRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import chatRoutes from "./routes/chatRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import dotenv from "dotenv";
import cors from "cors"
import http from "http";
import path from "path";
import { Server } from "socket.io";
dotenv.config();


const app = express();
const server = http.createServer(app);
app.use(cors());

connectDB();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
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
app.use("/resources", resourceRoutes);
app.use(
  "/teamrequests",
  teamRequestRoutes
);

app.use("/communities",communityRoutes);

app.use("/projects", projectRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/posts",postRoutes);
app.use("/chat", chatRoutes);
app.use("/events", eventRoutes);
app.use("/team", teamRoutes);
app.use("/tasks", taskRoutes);
app.use("/notifications", notificationRoutes);
app.use("/messages", messageRoutes);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("joinProject", (projectId) => {
    socket.join(projectId);
    console.log(`User joined project: ${projectId}`);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.projectId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// app.use((req, res) => {
//   res.status(404).json({
//     message: "Route Not Found"
//   });
// });

server.listen(8000, () => {
  console.log("Server Started at 8000");
});