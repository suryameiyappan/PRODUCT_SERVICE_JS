const
  clicExecusion = require('../utils/cli.helper'),
  Log = require("../config/app-config/logger.config"),
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
/*
|--------------------------------------------------------------------------
| MONGODB STATUS CHECK
|--------------------------------------------------------------------------
*/
const mongoStatus = async (request, response, next) => {
  const output = await clicExecusion('service mongod status');
  return response.json({
    status: STATUS,
    data: output
  });
};
/*
|--------------------------------------------------------------------------
| CLI OPERATIONS
|--------------------------------------------------------------------------
*/
const cliOperations = async (request, response, next) => {
  const output = await clicExecusion(request.body.command);
  Log.info(output);
  return response.json({
    status: STATUS,
    data: output
  });
};

module.exports = {
  apiVersion: api,
  mongoStatus: mongoStatus,
  cliOperations: cliOperations
};
