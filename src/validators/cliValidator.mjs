import { cliCommands } from "../enums/cliCommands.mjs";
import { EOL } from 'os';

/**
 * Validate command input from console.
 * @param {string} consoleLine - Raw console input string.
 * @returns {string} Valid command.
 */
export const cliValidator = async (consoleLine) => {
  const resultOfValidation = { status: false, result: null };

  if (consoleLine.length > 0) {
    const arrArgs = deleteSpaces(consoleLine);
    if (arrArgs.length > 0 && !!cliCommands[arrArgs[0]]) {
      resultOfValidation.status = true;
      resultOfValidation.result = arrArgs;

      return resultOfValidation;
    }
  }

  return resultOfValidation;
};

const deleteSpaces = (rawString) => {
  const space = ' ';
  const regExpNewLine = new RegExp(EOL, 'gi');
  const tempAccumulator = [];
  const arrArgs = rawString
    .toString()
    .trim()
    .replace(regExpNewLine, '')
    .split(space)
    .reduce((accumulator, item) => {
      if(item.length !== 0){
        accumulator.push(item);
      }
      return accumulator;
    }, tempAccumulator);
  
  return arrArgs;
};