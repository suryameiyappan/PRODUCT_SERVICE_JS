const
  emailQueue = require('../queue/email.queue'),
  NodeMailer = require('../../mail/node-mailer.mail'),
  pusherConfig = require("../../config/app-config/pusher.config");

emailQueue.process(async (data) => {
    console.log('<<======Worker started======>>');
    pusherConfig.trigger('my-channel', 'my-event', {
        message: data.data
    });
    const nodeMailer = new NodeMailer();
    await nodeMailer.execute(data.data);
    console.log('<<======Worker ended======>>');
});