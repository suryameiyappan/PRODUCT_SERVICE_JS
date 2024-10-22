const { loadFactory } = require("../config/factory-config/modules.config");
/*
|--------------------------------------------------------------------------
| HELPER METHOD FOR VALIDATION
|--------------------------------------------------------------------------
*/
exports.validator = async (request) => {
    const validator = await loadFactory(request.body.module_code, "ValidatorConfig");
    return validator[request.body.action](request.body.data);
}
/*
|--------------------------------------------------------------------------
| HELPER METHOD FOR VALIDATION
|--------------------------------------------------------------------------
*/
exports.serviceValidator = async (request, service) => {
    const validator = await loadFactory(service, "ValidatorConfig");
    return validator.validation(request.body);
}
