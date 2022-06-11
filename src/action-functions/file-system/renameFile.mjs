import { createPath, isExistDir } from "../system/paths.mjs";
import path from 'path';
import { rename } from "fs/promises";
import { messages } from "../../enums/messages.mjs";
import { EOL } from 'os';
import { cliArgsValidator } from "../../validators/cliArgsValidator.mjs";

const argsCount = 2;

export const renameFile = async (args) => {
  if (cliArgsValidator(args, argsCount)){
    const oldFileName = createPath(args[0]);
    const newFileName = createPath(args[1]);
    try {
      if ((await isExistDir(oldFileName)) !== null || (await isExistDir(newFileName)) !== null) {
        throw new Error();
      }
      await rename(oldFileName, newFileName);
    } catch {
      return messages.fail().concat(EOL);
    }
  } else {
    return messages.invalid().concat(EOL);
  }

  return '';
}