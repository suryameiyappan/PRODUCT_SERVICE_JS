const 
  Module = require("../Module"),
  moduleUtils = require("../utils/module.helper"),
  ChatBotConfig = require("../../config/factory-config/chat-bot.config");

class ChatBot extends Module {
  /*
  |--------------------------------------------------------------------------
  | CREATE CHATBOT CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  execute(request, response, next) {
    const chatbotModule = moduleUtils.getModuleProductObject(request, ChatBotConfig);
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
