const 
  Component = require("../Component"),
  emailConfig = require("../../config/email.config");

class Email extends Component {
  /*
  |--------------------------------------------------------------------------
  | CREATE EMAIL SERVICE CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  execute(request, response, next) {
    if (!emailConfig[request.body.action]) {
      throw new Error(
        `${request.body.component} Component : ${request.body.action} method not found`
      );
    }
    const serviceClass = emailConfig[request.body.action];
    const mailService = new serviceClass();
    return mailService.process(request, response, next);
  }

  getComponentName() {
    return "EMAIL";
  }
}

module.exports = Email;
