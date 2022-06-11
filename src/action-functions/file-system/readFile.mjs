import { createPath } from "../system/paths.mjs";
import path from 'path';
import { open } from "fs/promises";
import { messages } from "../../enums/messages.mjs";
import { EOL } from 'os';
import { InputManager } from "../../InputManager.js";

export const readFile = async (args) => {
  const space = ' ';
  const spacedPath = args.join(space);
  const pathToFile = createPath(spacedPath);

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

  return '';
}