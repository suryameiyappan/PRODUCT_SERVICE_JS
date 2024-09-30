const 
  validator = require("../utils/validator.helper"),
  { VALIDATION } = require("../constants/error.constant"),
  { INTERNAL_SERVER_ERROR } = require("../constants/error.constant"),
  ModuleFactoryInterface = require("../modules/ModuleFactoryInterface"),
  { VALIDATOR, ERROR_MSG } = require("../constants/error-message.constant");
/*
  |--------------------------------------------------------------------------
  | CREATE AUTH CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  const run = async (request, response, next) => {
    try {
      const validation = await validator.serviceValidator(request, 'AUTH_SERVICE');
      if (validation) {
        return response.json({ 
          code: VALIDATION,  message: VALIDATOR, data: validation.details.map(error => error.message) 
        });
      }
      const serviceObj = await request.factory.get(ModuleFactoryInterface).get(request.body.module);
      return await serviceObj.run(request, response, next);
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