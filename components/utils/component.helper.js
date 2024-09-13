/*
|--------------------------------------------------------------------------
| GET COMPONENT OBJECT
|--------------------------------------------------------------------------
*/
exports.getModuleProductObject = (request, components) => {
  const componentCode = request.body.component_code;
  const action = request.body.action;
  const component = request.body.component;
  const componentClass = components[componentCode];
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
