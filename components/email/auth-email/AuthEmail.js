const 
  emailQueue = require("../../../worker/queue/email.queue"),
  { SUCCESS } = require("../../../constants/error.constant"),
  { MAIL_SENDED } = require("../../../constants/error-message.constant");

class AuthEmail {
  /*
  |--------------------------------------------------------------------------
  | AUTH USER MAIL PROCESS
  |--------------------------------------------------------------------------
  */
  process(request, response, next) {
    let reqBody = request.body.data, mailData = {};
    mailData.mailTemplate = reqBody.template;
    mailData.mailData = reqBody.mailData;
    mailData.mailOptions = {
      from: `"${process.env.NODE_MAILER_SENDER_NAME}" <${process.env.NODE_MAILER_USERNAME}>`,
      ...reqBody.mailOptions
    };
    emailQueue.add(mailData);
    return { code : SUCCESS, message: MAIL_SENDED };
  }

}

module.exports = AuthEmail;
