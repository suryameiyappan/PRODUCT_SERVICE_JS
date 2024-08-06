class ModuleInterface {
  /**
   * @param {string} request
   * @param {object} response
   * @param {object} next
   *
   * @return {object}
   */
  run(request, response, next) {
    throw new Error(
      'ModuleInterface : Subclasses must implement the "run" method'
    );
  }
}
module.exports = ModuleInterface;
