/**
 * Validate argument input username.
 * @param {Array} args - Array of arguments.
 * @param {Array} argsList - Array of  arguments.
 * @returns {string} Valid name.
 */
export const cliArgsValidator = (args, argsCount, argsList = null) => {
  if (argsList === null && args.length === argsCount) {
    return true;
  }
}