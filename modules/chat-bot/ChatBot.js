const 
  Module = require("../Module"),
  moduleUtils = require("../utils/module.helper");

class ChatBot extends Module {
  /*
  |--------------------------------------------------------------------------
  | CREATE CHATBOT CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  async execute(request, response, next) {
    const chatbotModule = await moduleUtils.getModuleProductObject(request);
    return chatbotModule[request.body.action](
      request,
      response,
      next
    );
  }

  getModuleName() {
    return "ChatBot";
  }
}

module.exports = ChatBot;
