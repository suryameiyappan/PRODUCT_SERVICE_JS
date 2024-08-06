const ComponentInterface = require("../components/ComponentInterface");

class Component extends ComponentInterface {
  execute(request) {
    throw new Error("execute Method has no implementation");
  }

  getComponentName() {
    throw new Error("getComponentName Method has no implementation");
  }

  run(request, response, next) {
    const componentName = this.getComponentName();
    return this.execute(request, response, next);
  }
}

module.exports = Component;
