const 
  ejs = require('ejs'),
  juice = require('juice'),
  Log = require('../config/app-config/logger.config'),
  transporter = require('../config/app-config/node-mailer.config');

class NodeMailer {
  async execute(request) {
    try {
      const { mailData, mailTemplate, mailOptions } = request;
      const templatePath = `views/mail-template/${mailTemplate}.ejs`;
      const html = await ejs.renderFile(templatePath, mailData);
      const info = await transporter.sendMail({ ...mailOptions, html: juice(html) });
      Log.info('Success sending email:', info);
    } catch (err) {
      Log.error('Error sending email:', err);
    }
  }
}

module.exports = NodeMailer;
