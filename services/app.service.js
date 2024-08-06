const 
  { API_MSG } = require("../constants/error-message.constant"),
  { VERSION, STATUS } = require("../constants/common.constant");

/*
  |--------------------------------------------------------------------------
  | API VERSION METHOD
  |--------------------------------------------------------------------------
  */
const api = (request, response, next) => {
  return response.json({
    status: STATUS,
    version: VERSION,
    message: API_MSG,
  });
};

module.exports = {
  apiVersion: api,
};
