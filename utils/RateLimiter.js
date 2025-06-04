import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv();

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL; 
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN; 

const WINDOW_SECONDS = 60; // 1 minute window
const MAX_REQUESTS = 30;   // per IP

export const limiter = async (req, res, next) => {
  const ip = req.ip;
  const key = `ratelimit:${ip}`;

  try {
    // Increment request count
    const incrResponse = await axios.get(
      `${UPSTASH_URL}/incr/${key}`,
      {
        headers: {
          Authorization: `Bearer ${UPSTASH_TOKEN}`,
        },
      }
    );

    const count = incrResponse.data.result;

    // Set expiration on first request
    if (count === 1) {
      await axios.get(
        `${UPSTASH_URL}/expire/${key}/${WINDOW_SECONDS}`,
        {
          headers: {
            Authorization: `Bearer ${UPSTASH_TOKEN}`,
          },
        }
      );
    }

    // Reject if limit exceeded
    if (count > MAX_REQUESTS) {
      return res.status(429).json({
        error: "Too many requests, please try again later.",
      });
    }

    // Continue
    next();
  } catch (err) {
    console.error("Rate limiter error:", err.response?.data || err.message);
    res.status(500).json({ error: "Internal rate limiter error" });
  }
};
