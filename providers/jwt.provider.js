const 
  fs = require('fs'),
  jwt = require("jsonwebtoken"),
  jwtConfig = require('../config/app-config/jwt.config'),
  publicKey = fs.readFileSync('config/key/jwt-public.pem', 'utf-8'),
  privateKey = fs.readFileSync('config/key/jwt-private.pem', 'utf-8');

class JwtProvider {
  sign(payload) {
    return jwt.sign(payload, privateKey, jwtConfig.options);
  }
  verify(token) {
    try {
      return jwt.verify(token, publicKey, jwtConfig.options);
    } catch(error) {
      return false;
    }
  }
  decode(token) {
    return jwt.decode(token, { complete: true });
  }
}
module.exports = JwtProvider;