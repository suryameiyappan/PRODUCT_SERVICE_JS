const 
  ComponentFactoryInterface = require("./ComponentFactoryInterface"),
  { getProduct } = require("../config/factory-config/modules.config");

class ComponentFactory extends ComponentFactoryInterface {
  /*
  |--------------------------------------------------------------------------
  | CHECK COMPONENT EXISTS
  |--------------------------------------------------------------------------
  */
  async get(component) {
    const componentClass = await getProduct(component);
    if (!componentClass) throw new Error(`Undefined component: ${component}`)
    return new componentClass();
  }
}

module.exports = ComponentFactory;
