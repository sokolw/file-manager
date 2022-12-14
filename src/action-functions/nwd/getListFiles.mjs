import { readdir } from 'fs/promises';
import { messages } from '../../enums/messages.mjs';
import { EOL } from 'os';
import { cliArgsValidator } from '../../validators/cliArgsValidator.mjs';
import { Application } from '../../app.js';

const argsCount = 0;

const increaseSortCallback = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

export const getListFiles = async (args) => {
  const listFiles = {};
  if (cliArgsValidator(args, argsCount)) {
    const currentPath = Application._currentPath;
    try {
      listFiles.result = (await readdir(currentPath, { withFileTypes: true }))
        .sort((itemA, itemB) => +itemB.isDirectory() - +itemA.isDirectory())
        .sort((itemA, itemB) => {
          if (itemA.isDirectory() && itemB.isDirectory()) {
            return increaseSortCallback(itemA.name.toLowerCase(), itemB.name.toLowerCase());
          }
          if (!itemA.isDirectory() && !itemB.isDirectory()) {
            return increaseSortCallback(itemA.name.toLowerCase(), itemB.name.toLowerCase());
          }
        })
        .map((item) => {
          if (item.isDirectory()) {
            return `<dir>\t|\t${item.name}`;
          }
          return `<file>\t|\t${item.name}`;
        })
        .join(EOL)
        .concat(EOL);
    } catch {
      return messages.fail().concat(EOL);
    }
  } else {
    return messages.invalid().concat(EOL);
  }

  return `${messages.lineDelimiter}${EOL}${'Type\t|\tName'}${EOL}${messages.lineDelimiter}${EOL}${listFiles.result}${
    messages.lineDelimiter
  }${EOL}`;
};
