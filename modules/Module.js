const ModuleInterface = require("../modules/ModuleInterface");

class Module extends ModuleInterface {
  async execute(request) {
    throw new Error("execute Method has no implementation");
  }

  getModuleName() {
    throw new Error("getModuleName Method has no implementation");
  }

  async run(request, response, next) {
    const moduleName = this.getModuleName();
    return await this.execute(request, response, next);
  }
}

module.exports = Module;
