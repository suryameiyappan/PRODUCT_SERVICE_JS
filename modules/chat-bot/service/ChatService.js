const 
  { SUCCESS } = require("../../../constants/error.constant"),
  { SUCCESS_MSG } = require("../../../constants/error-message.constant"),
  chatBotRepository = require("../../../repositories/chat-bot.repositories");

class ChatService {
  /*
  |------------------------------------------
  | Function to create token for chatbot
  |------------------------------------------
  */
  chatService(request, response, next) {
    chatBotRepository.getQuestion(request).then((data) => {
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
