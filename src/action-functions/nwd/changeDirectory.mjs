import { messages } from "../../enums/messages.mjs";
import { cliArgsValidator } from "../../validators/cliArgsValidator.mjs"
import { EOL } from 'os';
import { isExistDir } from "../system/paths.mjs";
import { Application } from "../../app.js";

const argsCount = 1;

export const changeDirectory = async (args) => {
  const space = ' ';
  const spacedPath = [args.join(space)];
  if (cliArgsValidator(spacedPath, argsCount)){
    const pathToDir = await isExistDir(...spacedPath);

    if (pathToDir !== null) {
      Application._currentPath = pathToDir;
    } else {
      return messages.fail().concat(EOL);
    }

  }

  return '';
}