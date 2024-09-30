const { getSubProduct } = require("../../config/factory-config/sub-modules.config");

/*
|--------------------------------------------------------------------------
| GET COMPONENT OBJECT
|--------------------------------------------------------------------------
*/
exports.getModuleProductObject = async (request) => {
  const componentCode = request.body.component_code;
  const action = request.body.action;
  const component = request.body.component;
  const componentClass = await getSubProduct(componentCode);
  if (!componentClass) {
    throw new Error(
      `${component} Component :component code ${componentCode} class not found`
    );
  }
  const componentInstance = new componentClass();
  if (!componentInstance[action]) {
    throw new Error(
      `${component} Component : component ${componentCode} class method ${action} not found`
    );
  }
  return componentInstance;
};
