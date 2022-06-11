import { createPath, isExistDir } from "../system/paths.mjs";
import path from 'path';
import { open, unlink } from "fs/promises";
import { messages } from "../../enums/messages.mjs";
import { EOL } from 'os';
import { cliArgsValidator } from "../../validators/cliArgsValidator.mjs";
import { pipeline } from "stream/promises";
import { Writable, Readable } from "stream";

const argsCount = 1;

export const deleteFile = async (args) => {
  if (cliArgsValidator(args, argsCount)){
    const pathToDelFile = createPath(args[0]);
    try {
      if ((await isExistDir(pathToDelFile)) !== null) {
        throw new Error();
      }

      await unlink(pathToDelFile);
    } catch (err) {
      return messages.fail().concat(EOL);
    }
  } else {
    return messages.invalid().concat(EOL);
  }

  return '';
}