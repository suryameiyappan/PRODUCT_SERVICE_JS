const 
  componentsConfig = require("../config/factory-config/components.config"),
  ComponentFactoryInterface = require("./ComponentFactoryInterface");

class ComponentFactory extends ComponentFactoryInterface {
  /*
  |--------------------------------------------------------------------------
  | CHECK COMPONENT EXISTS
  |--------------------------------------------------------------------------
  */
  get(component) {
    const componentClass = componentsConfig[component];
    if (!componentClass) throw new Error(`Undefined component: ${component}`)
    return new componentClass();
  }
}

module.exports = ComponentFactory;
