import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import apiRoutes from "./routes";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

const PORT = process.env.PORT || 5000;

// Security & Utility Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: "Too many requests from this IP, please try again later."
});
app.use("/api/", limiter);

// API v1 Router
app.use("/api/v1", apiRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", service: "Mindwave Express API", timestamp: new Date().toISOString() });
});

// Socket.IO Real-Time Collaboration Setup
io.on("connection", (socket) => {
  console.log(`[Socket.IO] Client connected: ${socket.id}`);

  socket.on("join-project", (projectId: string) => {
    socket.join(`project-${projectId}`);
    console.log(`[Socket.IO] Client ${socket.id} joined project room ${projectId}`);
  });

  socket.on("task-moved", (data: { taskId: string; newStatus: string; projectId: string }) => {
    io.to(`project-${data.projectId}`).emit("task-updated", data);
  });

  socket.on("chat-message-send", (data: { channelId: string; content: string; sender: string }) => {
    io.emit("chat-message-received", data);
  });

  socket.on("disconnect", () => {
    console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Mindweave Backend API running on port ${PORT}`);
  console.log(`🔗 REST API Base URL: http://localhost:${PORT}/api/v1`);
  console.log(`==================================================`);
});
