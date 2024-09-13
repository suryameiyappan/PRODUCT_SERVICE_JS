const 
  ModuleFactoryInterface = require("../modules/ModuleFactoryInterface"),
  ComponentFactoryInterface = require("../components/ComponentFactoryInterface");
    
/*
|--------------------------------------------------------------------------
| GET COMPONENT OBJECT
|--------------------------------------------------------------------------
*/
exports.getComponent = (component, request, response, next) => {
    const factory = request.factory.get(ComponentFactoryInterface);
    const componentObject = factory.get(component);
    return componentObject.run(request, response, next);
};
/*
|--------------------------------------------------------------------------
| GET MODULE OBJECT
|--------------------------------------------------------------------------
*/
exports.getModule = (module, request, response, next) => {
    const factory = request.factory.get(ModuleFactoryInterface);
    const moduleObject = factory.get(module);
    return moduleObject.run(request, response, next);
};