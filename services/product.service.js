const 
  validator = require("../utils/validator.helper"),
  { VALIDATION } = require("../constants/error.constant"),
  { VALIDATOR } = require("../constants/error-message.constant"),
  { ERROR_MSG } = require("../constants/error-message.constant"),
  { INTERNAL_SERVER_ERROR } = require("../constants/error.constant"),
  ModuleFactoryInterface = require("../modules/ModuleFactoryInterface"),
  ComponentFactoryInterface = require("../components/ComponentFactoryInterface");
  /*
  |--------------------------------------------------------------------------
  | CREATE PRODUCT CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
const run = (request, response, next) => {
  try {
    const validation = validator.serviceValidator(request, 'PRODUCT_SERVICE');
    if (validation) {
      return response.json({ 
        code: VALIDATION,  message: VALIDATOR, data: validation.details.map(error => error.message) 
      });
    }
    let factory = request.factory, factoryType = request.body.component ? request.body.component : request.body.module;
    const getFactory = (request.body.component) ? factory.get(ComponentFactoryInterface) : factory.get(ModuleFactoryInterface);
    const serviceObj = getFactory.get(factoryType);
    return serviceObj.run(request, response, next);
  } catch (err) {
    return response.status(INTERNAL_SERVER_ERROR).json({
      code: INTERNAL_SERVER_ERROR,
      type: ERROR_MSG,
      message: err.message,
    });
  }
};

module.exports = {
  execute: run
};
