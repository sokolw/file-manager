import { open } from 'fs/promises';
import { EOL } from 'os';
import { messages } from '../../enums/messages.mjs';
import { cliArgsValidator } from '../../validators/cliArgsValidator.mjs';
import { createPath, parsePaths } from '../system/paths.mjs';

const argsCount = 1;

export const createEmptyFile = async (args) => {
  const argsParsed = parsePaths(args);
  
  if (cliArgsValidator(argsParsed, argsCount)){
    const pathToFile = createPath(argsParsed[0]);

    try {
      const emptyFile = await open(pathToFile, 'wx+');
      await emptyFile.close();
    } catch {
      return messages.fail().concat(EOL);
    }

  } else {
    return messages.invalid().concat(EOL);
  }

  return '';
}