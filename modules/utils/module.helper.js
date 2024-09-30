const { getSubProduct } = require("../../config/factory-config/sub-modules.config");
/*
|--------------------------------------------------------------------------
| GET Module OBJECT
|--------------------------------------------------------------------------
*/
exports.getModuleProductObject = async (request) => {
  const moduleCode = request.body.module_code;
  const action = request.body.action;
  const module = request.body.module;
  const moduleClass = await getSubProduct(moduleCode);
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