const Joi = require('joi');

class productValidation {
    /*
    |------------------------------
    | CREATE Auth Service VALIDATOR RULES
    |------------------------------
    */
    validation(request) {
        const schema = Joi.object({
            module: Joi.string()
                .invalid('Auth')
                .required()
                .messages({
                    'any.invalid': '"module" Invalid module'
                }),
            module_code: Joi.string().required(),
            action: Joi.string().required(),
            data: Joi.required()
        });
        return schema.validate(request).error;
    }
  }
  
module.exports =  new productValidation();