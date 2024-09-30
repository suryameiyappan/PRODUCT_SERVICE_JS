const 
  Module = require("../Module"),
  moduleUtils = require("../utils/module.helper");

class Auth extends Module {
  /*
  |--------------------------------------------------------------------------
  | CREATE Auth CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  async execute(request, response, next) {
    const authModule = await moduleUtils.getModuleProductObject(request);
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
