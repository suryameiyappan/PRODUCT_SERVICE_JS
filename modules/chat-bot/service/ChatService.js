const 
  factoryUtils = require("../../../utils/factory.helper"),
  { SUCCESS } = require("../../../constants/error.constant"),
  { SUCCESS_MSG } = require("../../../constants/error-message.constant"),
  chatBotRepository = require("../../../repositories/chat-bot.repositories");

class ChatService {
  /*
  |------------------------------------------
  | Function to create token for chatbot
  |------------------------------------------
  */
  async chatService(request, response, next) {
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
      console.log("================".chatBotData);
    }
    
    chatBotRepository.getQuestion(reqData).then((data) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: {
            context: data
          } 
        });
    }).catch((error) => {
      next(new Error(`ChatService : chatService Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to get error for chatbot
  |------------------------------------------
  */
  chatErrMessage(request, response, next) {
    chatBotRepository.getQuestion(request).then((resdata) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: resdata
        });
    }).catch((error) => {
      next(new Error(`ChatService : chatErrMessage Method : ${error}`));
    }); 
  }
}
module.exports = ChatService;
