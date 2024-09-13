
const redisClient = require("../db-config/redis.database").connectRedisClient(),
session = require("express-session"),
RedisStore = require("connect-redis")(session);

exports.sessionConfig = () => {
    const sessionConfig = {
        name: "PSA",
        store: new RedisStore({
            client: redisClient,
            db: parseInt(process.env.REDIS_DB),
            ttl: 3600
        }),
        cookie: {
            domain: process.env.SESSION_DOMAIN,
            maxAge: 3600000,
            httpOnly: true
        },
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    };
    return sessionConfig;
};
