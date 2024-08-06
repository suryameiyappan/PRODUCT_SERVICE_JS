const 
  modulesConfig = require("../config/modules.config"),
  ModuleFactoryInterface = require("./ModuleFactoryInterface");

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
