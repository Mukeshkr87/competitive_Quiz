import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const client = createClient({
  url: redisUrl,
});

client.on("error", (error) => {
  console.error("Redis client error:", error);
});

try {
  await client.connect();
  console.log("✅ Redis connected successfully");

  // Test basic operations
  await client.set("test_key", "test_value");
  const value = await client.get("test_key");
  console.log("✅ Redis SET/GET test passed:", value);

  await client.del("test_key");
  console.log("✅ Redis DEL test passed");

  await client.quit();
  console.log("✅ All Redis tests passed!");
} catch (error) {
  console.error("❌ Redis test failed:", error.message);
  process.exit(1);
}