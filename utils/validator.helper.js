const { getValidator } = require("../config/factory-config/validator.config");
/*
|--------------------------------------------------------------------------
| HELPER METHOD FOR VALIDATION
|--------------------------------------------------------------------------
*/
exports.validator = async (request) => {
    const validator = await getValidator(request.body.module_code);
    return validator[request.body.action](request.body.data);
}
/*
|--------------------------------------------------------------------------
| HELPER METHOD FOR VALIDATION
|--------------------------------------------------------------------------
*/
exports.serviceValidator = async (request, service) => {
    const validator = await getValidator(service);
    return validator.validation(request.body);
}