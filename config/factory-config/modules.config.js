
const 
  redisClient = require("../db-config/redis.database").connectRedisClient(),
  productConfigRepository = require("../../repositories/product-config.repositories");

exports.loadFactory = async (module, path) => {
  let key = `${path}:${module}`;
  const cachedRoute = await redisClient.getKey(key);

  if (!cachedRoute) {
    const route = await productConfigRepository.productConfig(module, path);
    await redisClient.setKey(key, JSON.stringify(route), 'EX', 172800);
  }
  
  let routes = cachedRoute ? cachedRoute : await redisClient.getKey(key);
  return require(JSON.parse(routes).product_class);
};
