import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

console.log("Testing Redis connection to:", redisUrl);

const client = createClient({
  url: redisUrl,
});

client.on("error", (error) => {
  console.error("Redis connection error:", error.message);
  process.exit(1);
});

client.on("connect", () => {
  console.log("✅ Redis connected successfully!");
});

client.on("ready", () => {
  console.log("✅ Redis client ready!");
  client.quit();
});

try {
  await client.connect();
} catch (error) {
  console.error("❌ Failed to connect to Redis:", error.message);
  process.exit(1);
}