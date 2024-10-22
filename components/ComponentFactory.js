const 
  { PRODUCT_ROUTES } = require("../constants/modules.constant"),
  ComponentFactoryInterface = require("./ComponentFactoryInterface"),
  { loadFactory } = require("../config/factory-config/modules.config");

class ComponentFactory extends ComponentFactoryInterface {
  /*
  |--------------------------------------------------------------------------
  | CHECK COMPONENT EXISTS
  |--------------------------------------------------------------------------
  */
  async get(component) {
    const componentClass = await loadFactory(component, PRODUCT_ROUTES);
    if (!componentClass) throw new Error(`Undefined component: ${component}`)
    return new componentClass();
  }
}

module.exports = ComponentFactory;
