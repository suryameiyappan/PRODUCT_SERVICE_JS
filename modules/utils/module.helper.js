const 
  { SUB_PRODUCT_ROUTES } = require("../../constants/modules.constant"),
  { loadFactory } = require("../../config/factory-config/modules.config");
/*
|--------------------------------------------------------------------------
| GET Module OBJECT
|--------------------------------------------------------------------------
*/
exports.getModuleProductObject = async (request) => {
  const moduleCode = request.body.module_code;
  const action = request.body.action;
  const module = request.body.module;
  const moduleClass = await loadFactory(moduleCode, SUB_PRODUCT_ROUTES);
  if (!moduleClass) {
    throw new Error(
      `${module} Module :Module code ${moduleCode} class not found`
    );
  }
  const moduleInstance = new moduleClass();
  if (!moduleInstance[request.body.action]) {
    throw new Error(
      `${module} Module :Module ${moduleCode} class method ${action} not found`
    );
  }
  return moduleInstance;
};
