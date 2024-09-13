const 
    path = require('path'),
    winston = require('winston');

const logPath = path.resolve(__dirname, '../../public/');
const Log = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logPath, 'logs', 'error.log'),
      level: 'error',
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  ]
});

module.exports = Log;