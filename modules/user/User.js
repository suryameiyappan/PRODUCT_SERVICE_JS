const 
  Module = require("../Module"),
  moduleUtils = require("../utils/module.helper");

class User extends Module {
  /*
  |--------------------------------------------------------------------------
  | CREATE User CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  async execute(request, response, next) {
    const userModule = await moduleUtils.getModuleProductObject(request);
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
