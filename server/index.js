import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDb } from "./connectDb.js";
import userRouter from "./routes/userRoute.js";
import questionRouter from "./routes/questionRoute.js";
import quizRouter from "./routes/quizRoute.js";
import aiRouter from "./routes/aiRoute.js";
import roomRouter from "./routes/roomRoute.js";
import scoreRouter from "./routes/scoreRoute.js";

import { handleSocket } from "./handlers/socketHandler.js";

dotenv.config();

const { initializeRedisClient, setRedisClient } = await import(
  "./handlers/redisHandler.js"
);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith("http://localhost:")) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

try {
  await connectDb();
  console.log("MongoDB connected");
} catch (err) {
  console.error("Failed to connect MongoDB:", err);
  process.exit(1);
}

try {
  const client = initializeRedisClient();
  setRedisClient(client);

  client.on("error", (error) => {
    console.error("Redis error:", error);
  });

  await client.connect();
  console.log("Redis connected");
  app.set("redisClient", client);
} catch (err) {
  console.error("Redis unavailable, continuing without cache:", err.message);
  setRedisClient(null);
}

app.get("/test", (req, res) => {
  res.json({ msg: "server running successfully" });
});

app.use("/api/user", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/talkToAI", aiRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/room", roomRouter);
app.use("/api/score", scoreRouter);

app.get("/redis-test", async (req, res) => {
  try {
    const client = app.get("redisClient");

    if (!client) {
      return res.status(503).json({
        success: false,
        message: "Redis client is not available",
      });
    }

    await client.set("test_key", "Hello from Redis!");
    const value = await client.get("test_key");
    await client.del("test_key");

    res.json({
      success: true,
      message: "Redis is working",
      data: value,
    });
  } catch (error) {
    console.error("Redis test error:", error);
    res.status(500).json({
      success: false,
      message: "Redis error",
      error: error.message,
    });
  }
});

app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const httpserver = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const wss = new Server(httpserver, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  },
});

handleSocket(wss);
