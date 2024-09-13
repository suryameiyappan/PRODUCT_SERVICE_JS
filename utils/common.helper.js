const { v4: uuidv4 } = require('uuid');
/*
|--------------------------------------------------------------------------
| HELPER METHOD
|--------------------------------------------------------------------------
*/
exports.generateToken = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.generateUniqueId = (prefix = 'x') => {
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 10000);
  return `${prefix}${timestamp}${randomPart}`;
}

exports.generateApiKey = () => {
  return uuidv4();
}