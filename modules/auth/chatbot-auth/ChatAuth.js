const 
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
  loginAccess(request, response, next) {
    chatBotRepository.getQuestion(request).then((data) => {
        const token = this.jwtAuthProvider.sign({ user_id: request.body.data.client_id });
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
