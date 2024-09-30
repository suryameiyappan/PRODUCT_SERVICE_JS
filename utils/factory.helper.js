const 
  ModuleFactoryInterface = require("../modules/ModuleFactoryInterface"),
  ComponentFactoryInterface = require("../components/ComponentFactoryInterface");
    
/*
|--------------------------------------------------------------------------
| GET COMPONENT OBJECT
|--------------------------------------------------------------------------
*/
exports.getComponent = async (component, request, response, next) => {
    const componentObject = await request.factory.get(ComponentFactoryInterface).get(component);
    return componentObject.run(request, response, next);
};
/*
|--------------------------------------------------------------------------
| GET MODULE OBJECT
|--------------------------------------------------------------------------
*/
exports.getModule = async (module, request, response, next) => {
    const moduleObject = await request.factory.get(ModuleFactoryInterface).get(module);
    return moduleObject.run(request, response, next);
};