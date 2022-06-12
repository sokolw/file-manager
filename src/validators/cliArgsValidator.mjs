/**
 * Validate argument input username.
 * @param {Array} args - Array of arguments.
 * @param {number} argsCount - Count args.
 * @param {Array} argsList - Array of list args.
 * @returns {boolean} Validation result.
 */
export const cliArgsValidator = (args, argsCount, argsList = null) => {
  if (argsList === null && args.length === argsCount) {
    return true;
  } else if (argsList !== null && args.length === argsCount) {
    return !!argsList[args[0]];
  } else {
    return false;
  }
};