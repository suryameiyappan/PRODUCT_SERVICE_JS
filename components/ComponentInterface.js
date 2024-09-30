class ComponentInterface {
  /**
   * @param {string} request
   * @param {object} response
   * @param {object} next
   *
   * @return {object}
   */
  async run(request, response, next) {
    throw new Error(
      'ComponentInterface : Subclasses must implement the "run" method'
    );
  }
}
module.exports = ComponentInterface;
