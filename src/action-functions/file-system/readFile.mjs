import { createPath, parsePaths } from '../system/paths.mjs';
import { open } from 'fs/promises';
import { messages } from '../../enums/messages.mjs';
import { EOL } from 'os';
import { InputManager } from '../../InputManager.js';
import { cliArgsValidator } from '../../validators/cliArgsValidator.mjs';

const argsCount = 1;

export const readFile = async (args) => {
  const argsParsed = parsePaths(args);
  
  if (cliArgsValidator(argsParsed, argsCount)){
    const pathToFile = createPath(argsParsed[0]);

    try {
      const readStream = (await open(pathToFile, 'r'))
        .createReadStream();
  
      await new Promise((resolve, reject) => {
        readStream.on('data', (data) => {
          InputManager._workingManager.push(data);
        });
  
        readStream.on('end', () => {
          InputManager._workingManager.push(EOL);
          resolve('OK');
        });
  
        readStream.on('error', () => {
          reject('FAIL');
        });
  
      });
    } catch {
      return messages.fail().concat(EOL);
    }
  } else {
    return messages.invalid().concat(EOL);
  }

  return '';
};