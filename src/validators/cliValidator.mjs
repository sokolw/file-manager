import { cliCommands } from '../enums/cliCommands.mjs';
import { EOL } from 'os';

/**
 * Validate command input from console.
 * @param {string} consoleLine - Raw console input string.
 * @returns {string} Valid command.
 */
export const cliValidator = async (consoleLine) => {
  const resultOfValidation = { status: false, result: null };

  if (consoleLine.length > 0) {
    const arrArgs = prepareToParse(consoleLine) ;

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

const prepareToParse = (rawFromConsole) => {
  let rawString = rawFromConsole.toString();
  const separator = '"';
  const args = [];

  if (rawString.includes(separator)) {
    let flag = true;
    let pos = 0;
    let countPos = 0;
    while (flag) {
      if (pos > -1 && countPos < 2) {
        pos = rawString.indexOf(separator, countPos > 0 ? pos + 1 : pos);
        if (pos > -1) {
          if (pos > 0 && countPos === 0) {
            const betweenPairs = deleteSpaces(rawString.slice(0, pos).trim());
            args.push(...betweenPairs);
          }
          countPos++;
          if (countPos === 1) {
            rawString = rawString.slice(pos);
            pos = 0;
          }
        }
      } else if (pos > -1 && countPos === 2) {
        const betweenQuotes = rawString.slice(0, pos + 1);
        rawString =  rawString.slice(pos + 1);
        pos = 0;
        countPos = 0;
        args.push(betweenQuotes);
      } else {
        const spaceDel = deleteSpaces(rawString);
        args.push(...spaceDel);
        flag = false;
      }
    }
    return args;
  } else {
    return deleteSpaces(rawString);
  }
};