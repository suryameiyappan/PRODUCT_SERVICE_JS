class ComponentFactoryInterface {
  /**
   * @param {string} componentName
   *
   * @return {object}
   */
  async get(componentName) {
    throw new Error(
      'ComponentFactoryInterface : Subclasses must implement the "get" method'
    );
  }
}
module.exports = ComponentFactoryInterface;
