import { argsKeywords } from "../enums/argsKeyWords.mjs";

/**
 * Validate argument input username.
 * @param {Array} args - Array of arguments.
 * @returns {string} Valid name.
 */
export const argsValidator = (args) => {
  const defaultName = 'Anonymous';
  const arrArgsKeywords = [...argsKeywords];
  if (args.length === 1 && args[0].startsWith(`${arrArgsKeywords[0]}=`)) {
    return args[0].slice(arrArgsKeywords[0].length + 1);
  } else {
    console.log(`You entered your username incorrectly, now you: ${defaultName}!`);
    return defaultName;
  }
}