const 
  Component = require("../Component"),
  { SUB_PRODUCT_ROUTES } = require("../../constants/modules.constant"),
  { loadFactory } = require("../../config/factory-config/modules.config");

class Email extends Component {
  /*
  |--------------------------------------------------------------------------
  | CREATE EMAIL SERVICE CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  async execute(request, response, next) {
    let checkEmail = await loadFactory(request.body.action, SUB_PRODUCT_ROUTES);
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
