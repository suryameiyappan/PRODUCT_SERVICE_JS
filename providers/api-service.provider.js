const 
  ModuleFactory = require("../modules/ModuleFactory"),
  ComponentFactory = require("../components/ComponentFactory"),
  ModuleFactoryInterface = require("../modules/ModuleFactoryInterface"),
  ComponentFactoryInterface = require("../components/ComponentFactoryInterface");
/*
|--------------------------------------------------------------------------
| BIND CLASS USING MAP METHOD
|--------------------------------------------------------------------------
*/
const ApiServiceProvider = new Map();
ApiServiceProvider.set(ModuleFactoryInterface, new ModuleFactory());
ApiServiceProvider.set(ComponentFactoryInterface, new ComponentFactory());

module.exports = ApiServiceProvider;
