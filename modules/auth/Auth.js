const 
  Module = require("../Module"),
  moduleUtils = require("../utils/module.helper"),
  AuthConfig = require("../../config/factory-config/authentication.config");

class Auth extends Module {
  /*
  |--------------------------------------------------------------------------
  | CREATE Auth CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  execute(request, response, next) {
    const authModule = moduleUtils.getModuleProductObject(request, AuthConfig);
    return authModule[request.body.action](
      request,
      response,
      next
    );
  }
  
  getModuleName() {
    return "Auth";
  }
}

module.exports = Auth;
