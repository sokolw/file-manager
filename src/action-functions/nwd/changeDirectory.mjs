import { messages } from '../../enums/messages.mjs';
import { cliArgsValidator } from '../../validators/cliArgsValidator.mjs'
import { EOL } from 'os';
import { isExistDir, parsePaths } from '../system/paths.mjs';
import { Application } from '../../app.js';

const argsCount = 1;

export const changeDirectory = async (args) => {
  const argsParsed = parsePaths(args);

  if (cliArgsValidator(argsParsed, argsCount)){
    const pathToDir = await isExistDir(argsParsed[0]);

    if (pathToDir !== null) {
      Application._currentPath = pathToDir;
    } else {
      return messages.fail().concat(EOL);
    }

  } else {
    return messages.invalid().concat(EOL);
  }

  return '';
};