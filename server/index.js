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

// Load env first
dotenv.config();

// Import Redis AFTER dotenv
const { initializeRedisClient, setRedisClient } = await import("./handlers/redisHandler.js");

const app = express();
const PORT = process.env.PORT || 3000;

//
// ✅ MIDDLEWARE
//
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith("http://localhost:")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//
// ✅ CONNECT SERVICES FIRST (CRITICAL)
//
try {
  // MongoDB
  await connectDb();
  console.log("✅ MongoDB connected");

  // Redis
  const client = initializeRedisClient();
  setRedisClient(client);

  client.on("error", (error) => {
    console.error("❌ Redis error:", error);
  });

  await client.connect();
  console.log("✅ Redis connected");

  // Attach client globally if needed
  app.set("redisClient", client);

} catch (err) {
  console.error("❌ Failed to initialize services:", err);
  process.exit(1); // stop server if critical dependency fails
}

//
// ✅ ROUTES
//
app.get("/test", (req, res) => {
  res.json({ msg: "server running successfully" });
});

app.use("/api/user", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/talkToAI", aiRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/room", roomRouter);
app.use("/api/score", scoreRouter);

//
// ✅ REDIS TEST ROUTE
//
app.get("/redis-test", async (req, res) => {
  try {
    const client = app.get("redisClient");

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

//
// ✅ GLOBAL ERROR HANDLER (VERY IMPORTANT)
//
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

//
// ✅ START SERVER LAST
//
const httpserver = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

//
// ✅ SOCKET.IO
//
const wss = new Server(httpserver, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  },
});

handleSocket(wss);