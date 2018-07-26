import redis from "redis";
export const RedisClient = redis.createClient();

RedisClient.on("connect", () => {
  console.log("Redis client connected");
});
RedisClient.on("error", function(err) {
  console.log("Something went wrong " + err);
});