const 
  { METHOD_NOT_ALLOWED } = require("../constants/error.constant"),
  { METHOD_INVALID } = require("../constants/error-message.constant");

function methodMiddleware(allowed) {
  return (request, response, next) => {
      if (!allowed.includes(request.method)) {
        return response.status(METHOD_NOT_ALLOWED).send({ code: METHOD_NOT_ALLOWED, message: METHOD_INVALID });
      }
      next();
  };
}

module.exports = methodMiddleware;
