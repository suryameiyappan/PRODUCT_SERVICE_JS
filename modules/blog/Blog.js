const 
  Module = require("../Module"),
  moduleUtils = require("../utils/module.helper"),
  BlogConfig = require("../../config/factory-config/blog.config");

class Blog extends Module {
  /*
  |--------------------------------------------------------------------------
  | CREATE Blog CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  execute(request, response, next) {
    const blogModule = moduleUtils.getModuleProductObject(request, BlogConfig);
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
