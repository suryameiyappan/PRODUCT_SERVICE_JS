const 
  Module = require("../Module"),
  moduleUtils = require("../utils/module.helper");

class Blog extends Module {
  /*
  |--------------------------------------------------------------------------
  | CREATE Blog CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  async execute(request, response, next) {
    const blogModule = await moduleUtils.getModuleProductObject(request);
    return blogModule[request.body.action](
      request,
      response,
      next
    );
  }

  getModuleName() {
    return "Blog";
  }
}

module.exports = Blog;
