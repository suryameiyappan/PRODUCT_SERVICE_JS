const
  { SUCCESS } = require("../../../constants/error.constant"),
  { SUCCESS_MSG } = require("../../../constants/error-message.constant");

class SlicLeadGen {
  sendOtp(request, response, next) {
    return { code: SUCCESS, message: SUCCESS_MSG };
  }

}

module.exports = SlicLeadGen;
