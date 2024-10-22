const 
  ModuleFactoryInterface = require("./ModuleFactoryInterface"),
  { loadFactory } = require("../config/factory-config/modules.config");

class ModuleFactory extends ModuleFactoryInterface {
  /*
  |--------------------------------------------------------------------------
  | CHECK MODULE EXISTS
  |--------------------------------------------------------------------------
  */
  async get(module) {
    const moduleClass = await loadFactory(module, "ProductRoutes");
    if (!moduleClass) throw new Error(`Undefined module: ${module}`);
    return new moduleClass();
  }
}

module.exports = ModuleFactory;
