const model = require("../models");

async function productConfig(product, repo) {
  try {
    return await model[repo].findOne({
      where: {
        product : product,
        is_active : 1
      }
    });
  } catch (error) {
    throw new Error(`Product Config Repository productRoutes Method : ${error}`);
  }
}

module.exports = {
  productConfig: productConfig
};
