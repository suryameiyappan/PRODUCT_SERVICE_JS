const Joi = require('joi');

class jwtValidation {
    /*
    |---------------------------------------
    | CREATE JWT REGISTER VALIDATOR RULES
    |---------------------------------------
    */
    register(request) {
        const schema = Joi.object({
            username: Joi.string().min(5).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required(),
            phone_number: Joi.string().min(10).required()
        });
        return schema.validate(request).error;
    }
    /*
    |-----------------------------------
    | CREATE JWT LOGIN VALIDATOR RULES
    |-----------------------------------
    */
    login(request) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required()
        });
        return schema.validate(request).error;
    }
    /*
    |-----------------------------------
    | CREATE JWT FORGOT PASSWORD VALIDATOR RULES
    |-----------------------------------
    */
    forgotPassword(request) {
        const schema = Joi.object({
            email: Joi.string().email().required()
        });
        return schema.validate(request).error;
    }
    /*
    |-----------------------------------
    | CREATE JWT VERIFICATION VALIDATOR RULES
    |-----------------------------------
    */
    verification(request) {
        const schema = Joi.object({
            verify_token: Joi.string().required()
        });
        return schema.validate(request).error;
    }
  }
  
module.exports = new jwtValidation();