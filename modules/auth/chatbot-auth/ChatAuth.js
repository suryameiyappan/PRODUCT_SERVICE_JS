const 
factoryUtils = require("../../../utils/factory.helper"),
  JwtProvider = require("../../../providers/jwt.provider"),
  { SUCCESS } = require("../../../constants/error.constant"),
  { SUCCESS_MSG } = require("../../../constants/error-message.constant"),
  chatBotRepository = require("../../../repositories/chat-bot.repositories");

class ChatAuth {
  /*
  |----------------------------
  | Constructor
  |----------------------------
  */
  constructor(jwtProvider = new JwtProvider) {
    this.jwtAuthProvider = jwtProvider;
  }
  /*
  |------------------------------------------
  | Function to create token for chatbot
  |------------------------------------------
  */
  async loginAccess(request, response, next) {
    const reqData = request.body.data;

    const moduleExists = await chatBotRepository.checkQuestionModule(reqData);
    await chatBotRepository.questionAnswerCreate(reqData, moduleExists);
    if (moduleExists.module) {
      request.body = {
        "component_code": moduleExists.module.component_code,
        "action": moduleExists.module.action,
        "data": {
          ...request.body.data,
          "previous_question" : moduleExists
        }
      };
      const chatBotData = factoryUtils.getComponent(moduleExists.module.component, request, response, next);
    }

    chatBotRepository.getQuestion(reqData).then((data) => {
        const token = this.jwtAuthProvider.sign({ user_id: reqData.client_id });
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: {
            context: data,
            access_token : token
          } 
        });
    }).catch((error) => {
      next(new Error(`ChatAuth : loginAccess Method : ${error}`));
    }); 
  }
}
module.exports = ChatAuth;
