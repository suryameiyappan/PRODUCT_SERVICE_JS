const   redis = require('redis');
/**
 * Connect redis db
 * @returns {object} redis connection
 * @public
 */
exports.connectRedisClient = () => {
    const redisClient = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      db: process.env.REDIS_DB
    });
    redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });
    redisClient.on('error', (err) => {
      console.error('Redis error:', err);
    });
    return redisClient;
};

