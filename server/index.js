import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { connectDb } from "./connectDb.js";
import userRouter from "./routes/userRoute.js";
import questionRouter from "./routes/questionRoute.js";
import quizRouter from "./routes/quizRoute.js";
import aiRouter from "./routes/aiRoute.js";
import roomRouter from "./routes/roomRoute.js";
import scoreRouter from "./routes/scoreRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { auth } from "./middleware/auth.js";
import { handleSocket } from "./handlers/socketHandler.js";

dotenv.config();
const { initializeRedisClient, setRedisClient } = await import("./handlers/redisHandler.js");

// Initialize Redis client after environment is loaded
const client = initializeRedisClient();
setRedisClient(client);

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

await connectDb();

app.get("/test", (req, res) => {
  return res.json({
    msg: "server running successfully",
  });
});

// user routes
app.use("/api/user", userRouter);
app.use("/api/question", auth, questionRouter);
app.use("/api/talkToAI", auth, aiRouter);
app.use("/api/quiz", auth, quizRouter);
app.use("/api/room", auth, roomRouter);
app.use("/api/score", auth, scoreRouter);

// http server
const httpserver = app.listen(PORT, () => {
  console.log("server listening to port ", PORT);
});

// Test Redis endpoint
app.get("/redis-test", async (req, res) => {
  try {
    await client.set("test_key", "Hello from Redis!");
    const value = await client.get("test_key");
    await client.del("test_key");

    res.json({
      success: true,
      message: "Redis is working",
      data: value
    });
  } catch (error) {
    console.error("Redis test error:", error);
    res.status(500).json({
      success: false,
      message: "Redis error",
      error: error.message
    });
  }
});

// redis server
client.on("error", (error) => console.log("redis client error", error));

await client.connect();

// websocket server

const wss = new Server(httpserver, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

handleSocket(wss);
