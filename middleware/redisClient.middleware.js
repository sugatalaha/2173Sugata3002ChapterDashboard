import redisClient from "../utils/redisClient.js";

const cacheMiddleware = async (req, res, next) => {
  const key = `chapters:${JSON.stringify(req.query)}`; // key based on filters
  try {
    const data = await redisClient.get(key);
    if (data) {
      return res.status(200).json(JSON.parse(data)); // serve from cache
    }
    res.locals.cacheKey = key; // for later saving
    next();
  } catch (err) {
    console.error("Cache error", err);
    next();
  }
};

export default cacheMiddleware;
