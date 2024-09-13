const 
  ModuleFactoryInterface = require("./ModuleFactoryInterface"),
  modulesConfig = require("../config/factory-config/modules.config");

class ModuleFactory extends ModuleFactoryInterface {
  /*
  |--------------------------------------------------------------------------
  | CHECK MODULE EXISTS
  |--------------------------------------------------------------------------
  */
  get(module) {
    const moduleClass = modulesConfig[module];
    if (!moduleClass) throw new Error(`Undefined module: ${module}`)
    return new moduleClass();
  }
}

module.exports = ModuleFactory;
