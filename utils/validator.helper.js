const 
    { VALIDATOR_CONFIG } = require("../constants/modules.constant"),
    { loadFactory } = require("../config/factory-config/modules.config");
/*
|--------------------------------------------------------------------------
| HELPER METHOD FOR VALIDATION
|--------------------------------------------------------------------------
*/
exports.validator = async (request) => {
    const validator = await loadFactory(request.body.module_code, VALIDATOR_CONFIG);
    return validator[request.body.action](request.body.data);
}
/*
|--------------------------------------------------------------------------
| HELPER METHOD FOR VALIDATION
|--------------------------------------------------------------------------
*/
exports.serviceValidator = async (request, service) => {
    const validator = await loadFactory(service, VALIDATOR_CONFIG);
    return validator.validation(request.body);
}
