const 
  Module = require("../Module"),
  moduleUtils = require("../utils/module.helper"),
  ChatBotCmsConfig = require("../../config/factory-config/chat-bot-cms.config");
  

class ChatBotCms extends Module {
  /*
  |--------------------------------------------------------------------------
  | CREATE CHATBOT CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  execute(request, response, next) {
    const chatbotCmsModule = moduleUtils.getModuleProductObject(request, ChatBotCmsConfig);
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
