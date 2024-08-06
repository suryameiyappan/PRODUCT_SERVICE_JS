const 
  Component = require("../Component"),
  componentUtils = require("../utils/component.helper"),
  productConfig = require("../../config/product.config");

class Product extends Component {
  /*
  |--------------------------------------------------------------------------
  | CREATE PRODUCT CLASS AND METHOD INSTANCE
  |--------------------------------------------------------------------------
  */
  execute(request, response, next) {
    const product = componentUtils.getModuleProductObject(request, productConfig);
    return product[request.body.action](
      request,
      response,
      next
    );
  }

  getComponentName() {
    return "Product";
  }
}

module.exports = Product;
