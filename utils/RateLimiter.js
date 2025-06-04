import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redisClient from "./redisClient.js";

export const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
