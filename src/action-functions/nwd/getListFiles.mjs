import { readdir } from 'fs/promises';
import { messages } from '../../enums/messages.mjs';
import { EOL } from 'os';
import { cliArgsValidator } from '../../validators/cliArgsValidator.mjs';
import { Application } from '../../app.js';

const argsCount = 0;

export const getListFiles = async (args) => {
  const listFiles = {};
  if (cliArgsValidator(args, argsCount)){
    const currentPath = Application._currentPath;
    try {
      listFiles.result = (await readdir(currentPath, { withFileTypes : true }))
        .map(item => {
          if (item.isDirectory()){
            return `<dir>\t${item.name}`;
          }
          return `<file>\t${item.name}`;
        })
        .join(EOL)
        .concat(EOL);
    } catch {
      return messages.fail().concat(EOL);
    }
  } else {
    return messages.invalid().concat(EOL);
  }

  return `${messages.lineDelimiter}${EOL}${listFiles.result}${messages.lineDelimiter}${EOL}`;
}