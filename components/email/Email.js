const 
  Component = require("../Component"),
  { getSubProduct } = require("../../config/factory-config/sub-modules.config");

class Email extends Component {
  /*
  |--------------------------------------------------------------------------
  | CREATE EMAIL SERVICE CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  async execute(request, response, next) {
    let checkEmail = await getSubProduct(request.body.action);
    if (!checkEmail) {
      throw new Error(
        `${request.body.component} Component : ${request.body.action} method not found`
      );
    }
    const serviceClass = checkEmail;
    const mailService = new serviceClass();
    return mailService.process(request, response, next);
  }

  getComponentName() {
    return "EMAIL";
  }
}

module.exports = Email;
