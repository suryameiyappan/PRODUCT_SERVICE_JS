const 
  model = require("../models"),
  { ProductRoutes, SubProductRoutes, ValidatorConfig } = model;

async function productRoutes(product) {
  try {
    return await ProductRoutes.findOne({
      where: {
        product : product,
        is_active : 1
      }
    });
  } catch (error) {
    throw new Error(`Product Config Repository productRoutes Method : ${error}`);
  }
}

async function subProductRoutes(subProduct) {
  try {
    return await SubProductRoutes.findOne({
      where: {
        product : subProduct,
        is_active : 1
      }
    });
  } catch (error) {
    throw new Error(`Product Config Repository subProductRoutes Method : ${error}`);
  }
}

async function validatorConfig(validator) {
  try {
    return await ValidatorConfig.findOne({
      where: {
        product : validator,
        is_active : 1
      }
    });
  } catch (error) {
    throw new Error(`Product Config Repository validatorConfig Method : ${error}`);
  }
}

module.exports = {
  productRoutes: productRoutes,
  validatorConfig: validatorConfig,
  subProductRoutes: subProductRoutes
};