import { messages } from '../../enums/messages.mjs';
import { cliArgsValidator } from '../../validators/cliArgsValidator.mjs';
import { EOL } from 'os';
import { createPath, isExistDir, parsePaths } from '../system/paths.mjs';
import { open } from 'fs/promises';
import crypto from 'crypto';
import { InputManager } from '../../InputManager.js';

const argsCount = 1;
const typeHash = 'sha256';
const hexadecimal = 'hex';

export const calculateHash = async (args) => {
  const argsParsed = parsePaths(args);
  
  if (cliArgsValidator(argsParsed, argsCount)){
    const pathToFile = createPath(argsParsed[0]);

    try {
      if ((await isExistDir(pathToFile)) !== null) {
        throw new Error('It is not file!');
      }

      const readStream = (await open(pathToFile, 'r'))
        .createReadStream();
      
      await new Promise((resolve, reject) => {
        readStream.on('data', (data) => {
          const hash = crypto.createHash(typeHash);
          InputManager._workingManager.push(hash.update(data).digest(hexadecimal));
        });

        readStream.on('end', () => {
          InputManager._workingManager.push(EOL);
          resolve('OK');
        });

        readStream.on('error', () => {
          reject('FAIL');
        });

      });
      
    } catch (err) {
      return messages.fail().concat(EOL);
    }
  } else {
    return messages.invalid().concat(EOL);
  }

  return '';
};