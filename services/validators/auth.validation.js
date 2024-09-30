const Joi = require('joi');

class authValidation {
    /*
    |------------------------------
    | CREATE Auth Service VALIDATOR RULES
    |------------------------------
    */
    validation(request) {
        const schema = Joi.object({
            module: Joi.string()
            .valid('Auth')
            .required()
            .messages({
                'any.only': '"module" Invalid module"'
            }),
            module_code: Joi.string().required(),
            action: Joi.string().required(),
            data: Joi.object().required()
        });
        return schema.validate(request).error;
    }
  }
  
module.exports = new authValidation();