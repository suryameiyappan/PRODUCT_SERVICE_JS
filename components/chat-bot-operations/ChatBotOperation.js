const 
  Component = require("../Component"),
  componentUtils = require("../utils/component.helper"),
  chatOperationConfig = require("../../config/factory-config/chat-operations.config");

class ChatBotOperation extends Component {
  /*
  |--------------------------------------------------------------------------
  | CREATE CHAT OPERATION CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  execute(request, response, next) {
    const product = componentUtils.getModuleProductObject(request, chatOperationConfig);
    return product[request.body.action](
      request,
      response,
      next
    );
  }

  getComponentName() {
    return "CHAT_BOT_OPERATION";
  }
}

module.exports = ChatBotOperation;
