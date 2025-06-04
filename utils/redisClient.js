import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const headers = {
  Authorization: `Bearer ${UPSTASH_TOKEN}`,
};

const redisClient = {
  async setEx(key, ttlSeconds, value) {
    return axios.get(`${UPSTASH_URL}/setex/${key}/${ttlSeconds}/${encodeURIComponent(value)}`, {
      headers,
    });
  },

  async flushAll() {
    return axios.get(`${UPSTASH_URL}/flushall`, {
      headers,
    });
  },

  async get(key) {
    const res = await axios.get(`${UPSTASH_URL}/get/${key}`, { headers });
    return res.data?.result || null;
  },
};

export default redisClient;
