import { open } from 'fs/promises';
import { EOL } from 'os';
import { messages } from '../../enums/messages.mjs';
import { createPath } from '../system/paths.mjs';

export const createEmptyFile = async (args) => {
  const space = ' ';
  const spacedPath = args.join(space);
  const pathToFile = createPath(spacedPath);
  try {
    const emptyFile = await open(pathToFile, 'wx+');
    await emptyFile.close();
  } catch {
    return messages.fail().concat(EOL);
  }

  return '';
}