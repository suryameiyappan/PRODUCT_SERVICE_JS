const 
  Module = require("../Module"),
  moduleUtils = require("../utils/module.helper");
  

class ChatBotCms extends Module {
  /*
  |--------------------------------------------------------------------------
  | CREATE CHATBOT CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  async execute(request, response, next) {
    const chatbotCmsModule = await moduleUtils.getModuleProductObject(request);
    return chatbotCmsModule[request.body.action](
      request,
      response,
      next
    );
  }

  getModuleName() {
    return "ChatBotCms";
  }
}

module.exports = ChatBotCms;
