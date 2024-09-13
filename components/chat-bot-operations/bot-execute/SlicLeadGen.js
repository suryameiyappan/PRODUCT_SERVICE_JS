const 
  chatBotRepository = require('../../../repositories/chat-bot.repositories'),
  { SUCCESS, FAILED_RETRIVE_CODE } = require("../../../constants/error.constant"),
  {
    SUCCESS_MSG, ERROR_MSG
  } = require("../../../constants/error-message.constant");

class SlicLeadGen {
  sendOtp(request, response, next) {
    const reqData = request.body.data;
    return { code: 200, message: "successfully retrived" };
    // chatBotRepository.questionAnswerCreate().then((data) => {
    //     if (data === null || data.length === 0) {
    //         return response.json({
    //           code: FAILED_RETRIVE_CODE,
    //           message: ERROR_MSG,
    //           data: [],
    //         });
    //     }
    //     return response.json({
    //         code: SUCCESS,
    //         message: SUCCESS_MSG,
    //         data: data,
    //       });
    // });
  }

}

module.exports = SlicLeadGen;
