const ComponentInterface = require("../components/ComponentInterface");

class Component extends ComponentInterface {
  async execute(request) {
    throw new Error("execute Method has no implementation");
  }

  getComponentName() {
    throw new Error("getComponentName Method has no implementation");
  }

  async run(request, response, next) {
    const componentName = this.getComponentName();
    return await this.execute(request, response, next);
  }
}

module.exports = Component;
