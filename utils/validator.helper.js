const validatorConfig = require("../config/validator.config");
/*
|--------------------------------------------------------------------------
| HELPER METHOD FOR VALIDATION
|--------------------------------------------------------------------------
*/
exports.validator = (request) => {
    const validator = validatorConfig[request.body.module_code];
    return validator[request.body.action](request.body.data);
}
/*
|--------------------------------------------------------------------------
| HELPER METHOD FOR VALIDATION
|--------------------------------------------------------------------------
*/
exports.serviceValidator = (request, service) => {
    const validator = validatorConfig[service];
    return validator.validation(request.body);
}