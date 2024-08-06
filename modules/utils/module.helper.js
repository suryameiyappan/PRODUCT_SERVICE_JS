/*
|--------------------------------------------------------------------------
| GET Module OBJECT
|--------------------------------------------------------------------------
*/
exports.getModuleProductObject = (request, modules) => {
  const moduleCode = request.body.module_code;
  const action = request.body.action;
  const module = request.body.module;
  const moduleClass = modules[moduleCode];
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
/*
|--------------------------------------------------------------------------
| Question formater
|--------------------------------------------------------------------------
*/
exports.questionCodeGen = (request, modules) => {
  return "moduleInstance";
};