import redis from "redis";
export const RedisClient = redis.createClient();

RedisClient.on("connect", () => {
  console.log("Redis client connected");
});
RedisClient.on("error", function(err) {
  console.log("Something went wrong " + err);
});

export let saveUser = (userID: string, email: string, password: string) => {
    RedisClient.hset(`user:${userID}`, "email", email);
    RedisClient.hset(`user:${userID}`, "password", password);

    RedisClient.sadd("userEmails", email);
}