const Queue = require('bull');

const emailQueue = new Queue('email-queue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

module.exports = emailQueue;