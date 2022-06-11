import { Application } from './../../app.js';
import path from 'path';
import { cliArgsValidator } from '../../validators/cliArgsValidator.mjs';
import { messages } from '../../enums/messages.mjs';
import { EOL } from 'os';

const argsCount = 0;

export const upDirectory = (args) => {
  if (cliArgsValidator(args, argsCount)){
    const arrPath = Application._currentPath.split(path.sep);

    if (arrPath.length > 1) {
      arrPath.pop();
      Application._currentPath = path.join(...arrPath, arrPath.length === 1 ? path.sep : '');
    }
  } else {
    return messages.invalid().concat(EOL);
  }

  return '';
}