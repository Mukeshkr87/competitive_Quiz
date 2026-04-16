import { createClient } from "redis";

let redisClient = null;

export const initializeRedisClient = () => {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

    redisClient = createClient({
      url: redisUrl,
      socket: {
        connectTimeout: 60000,
        lazyConnect: true,
      },
    });

    // Add connection event handlers
    redisClient.on("error", (error) => {
      console.error("Redis client error:", error.message);
    });

    redisClient.on("connect", () => {
      console.log("Redis client connected");
    });

    redisClient.on("ready", () => {
      console.log("Redis client ready");
    });

    redisClient.on("end", () => {
      console.log("Redis client connection ended");
    });
  }

  return redisClient;
};

export const setRedisClient = (client) => {
  redisClient = client;
};

export const getRedisClient = () => redisClient;
