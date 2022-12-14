import { createPath, isExistDir, parsePaths } from '../system/paths.mjs';
import { rename } from 'fs/promises';
import { messages } from '../../enums/messages.mjs';
import { EOL } from 'os';
import { cliArgsValidator } from '../../validators/cliArgsValidator.mjs';

const argsCount = 2;

export const renameFile = async (args) => {
  const argsParsed = parsePaths(args);
  
  if (cliArgsValidator(argsParsed, argsCount)){
    const workPaths = {
      oldFileName : createPath(argsParsed[0]),
      newFileName : createPath(argsParsed[1]),
    };

    try {
      if ((await isExistDir(workPaths.oldFileName)) !== null || 
          (await isExistDir(workPaths.newFileName)) !== null
      ) {
        throw new Error('It is not file!');
      }

      await rename(workPaths.oldFileName, workPaths.newFileName);

    } catch {
      return messages.fail().concat(EOL);
    }

  } else {
    return messages.invalid().concat(EOL);
  }

  return '';
};