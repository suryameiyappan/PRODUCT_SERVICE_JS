const 
  Module = require("../Module"),
  moduleUtils = require("../utils/module.helper"),
  UserConfig = require("../../config/factory-config/user.config");

class User extends Module {
  /*
  |--------------------------------------------------------------------------
  | CREATE User CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  execute(request, response, next) {
    const userModule = moduleUtils.getModuleProductObject(request, UserConfig);
    return userModule[request.body.action](
      request,
      response,
      next
    );
  }
  
  getModuleName() {
    return "User";
  }
}

module.exports = User;
