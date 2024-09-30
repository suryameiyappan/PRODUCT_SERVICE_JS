const 
  Component = require("../Component"),
  componentUtils = require("../utils/component.helper");

class ChatBotOperation extends Component {
  /*
  |--------------------------------------------------------------------------
  | CREATE CHAT OPERATION CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  async execute(request, response, next) {
    const product = await componentUtils.getModuleProductObject(request);
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
