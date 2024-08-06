const 
  leadRepo = require('../../../repositories/lead.repositories'),
  { SUCCESS, FAILED_RETRIVE_CODE } = require("../../../constants/error.constant"),
  {
    SUCCESS_MSG, ERROR_MSG
  } = require("../../../constants/error-message.constant");

class LeadGen {
  getleads(request, response, next) {
    leadRepo.getLead().then((data) => {
        if (data === null || data.length === 0) {
            return response.json({
              code: FAILED_RETRIVE_CODE,
              message: ERROR_MSG,
              data: [],
            });
        }
        return response.json({
            code: SUCCESS,
            message: SUCCESS_MSG,
            data: data,
          });
    });
  }

}

module.exports = LeadGen;
