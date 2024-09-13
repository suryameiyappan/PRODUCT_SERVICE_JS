const 
  JwtProvider = require('../providers/jwt.provider'),
  { UNAUTHORIZED, FORBIDDEN } = require("../constants/error.constant");

function authMiddleware(request, response, next) {
  const authHeader = request.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token || request.logout.has(token)){
    return response.sendStatus(UNAUTHORIZED);
  }
  const jwtAuthProvider = new JwtProvider();
  const userDetails = jwtAuthProvider.verify(token);
  if (!userDetails) {
    return response.sendStatus(FORBIDDEN);
  }
  request.user = userDetails;
  next();
}

module.exports = authMiddleware;
