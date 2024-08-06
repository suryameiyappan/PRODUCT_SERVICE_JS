const Joi = require('joi');

class productValidation {
    /*
    |------------------------------
    | CREATE Auth Service VALIDATOR RULES
    |------------------------------
    */
    validation(request) {
        const schema = Joi.object({
            component: Joi.string()
                .invalid('Auth')
                .messages({
                    'any.invalid': '"component" Invalid component'
                }),
            module: Joi.string()
                .invalid('Auth')
                .messages({
                    'any.invalid': '"module" Invalid module'
                }),
            module_code: Joi.string(),
            component_code: Joi.string(),
            action: Joi.string().required(),
            data: Joi.required()
        })
        .xor('component', 'module')
        .xor('component_code', 'module_code');
        return schema.validate(request).error;
    }
  }
  
module.exports =  new productValidation();