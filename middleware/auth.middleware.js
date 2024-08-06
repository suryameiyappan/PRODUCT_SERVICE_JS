const 
  JwtProvider = require('../providers/jwt.provider'),
  { UNAUTHORIZED, FORBIDDEN } = require("../constants/error.constant");

function authMiddleware(request, response, next) {
  const authHeader = request.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return response.sendStatus(UNAUTHORIZED);
  if (request.logout.has(token)) return response.sendStatus(UNAUTHORIZED);
  const jwtAuthProvider = new JwtProvider();
  const verifyToken = jwtAuthProvider.verify(token);
  if (!verifyToken) return response.sendStatus(FORBIDDEN);
  request.user = verifyToken;
  next();
}

module.exports = authMiddleware;
