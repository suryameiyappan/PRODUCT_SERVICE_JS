class ModuleFactoryInterface {
  /**
   * @param {string} componentName
   *
   * @return {object}
   */
  async get(componentName) {
    throw new Error(
      'ModuleFactoryInterface : Subclasses must implement the "get" method'
    );
  }
}
module.exports = ModuleFactoryInterface;
