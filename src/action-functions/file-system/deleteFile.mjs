import { createPath, isExistDir, parsePaths } from "../system/paths.mjs";
import { unlink } from "fs/promises";
import { messages } from "../../enums/messages.mjs";
import { EOL } from 'os';
import { cliArgsValidator } from "../../validators/cliArgsValidator.mjs";

const argsCount = 1;

export const deleteFile = async (args) => {
  const argsParsed = parsePaths(args);
  
  if (cliArgsValidator(argsParsed, argsCount)){
    const pathToFile = createPath(argsParsed[0]);

    try {
      if ((await isExistDir(pathToFile)) !== null) {
        throw new Error('It is not file!');
      }

      await unlink(pathToFile);

    } catch {
      return messages.fail().concat(EOL);
    }
    
  } else {
    return messages.invalid().concat(EOL);
  }

  return '';
}