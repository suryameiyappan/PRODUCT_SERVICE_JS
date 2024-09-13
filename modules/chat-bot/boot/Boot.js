const
  { SUCCESS, UNAUTHORIZED } = require("../../../constants/error.constant"),
  { SUCCESS_MSG, INVALID_ACCESS } = require("../../../constants/error-message.constant"),
  chatBotRepository = require("../../../repositories/chat-bot.repositories");

class Boot {
  /*
  |----------------------------
  | Function to save article
  |----------------------------
  */
  async connectBot(request, response, next) {
    const chatConfigData = await chatBotRepository.chatConfig(request);
    if (chatConfigData !== null) {
        chatBotRepository.boot(request, chatConfigData).then((data) => {
          if (data === null || data.length === 0) {
            next(new Error(`Data retrive failed!`));
          }
          return response.json({ code: SUCCESS, message: SUCCESS_MSG, data: data });
        }).catch((error) => {
          next(new Error(`Boot : connectBot Method : ${error}`));
        });
    } else {
      return response.json({ code: UNAUTHORIZED, message: INVALID_ACCESS, data: [] });
    }
  }
}

module.exports = Boot;
