import { createPath, isExistDir } from "../system/paths.mjs";
import path from 'path';
import { open } from "fs/promises";
import { messages } from "../../enums/messages.mjs";
import { EOL } from 'os';
import { cliArgsValidator } from "../../validators/cliArgsValidator.mjs";
import { pipeline } from "stream/promises";
import { Writable, Readable } from "stream";

const argsCount = 2;

export const copyFile = async (args) => {
  if (cliArgsValidator(args, argsCount)){
    const srcFilePath = createPath(args[0]);
    const destFilePath = createPath(args[1]);

    let readStream = null;
    let writeStream = null;

    try {
      if ((await isExistDir(srcFilePath)) !== null || (await isExistDir(destFilePath)) !== null) {
        throw new Error();
      }

      readStream = (await open(srcFilePath, 'r'))
        .createReadStream();
      writeStream = (await open(destFilePath, 'wx'))
        .createWriteStream();

      await pipeline(readStream, writeStream);
    } catch (err) {
      if (readStream instanceof Readable && !readStream.destroyed) readStream.destroy();
      if (writeStream instanceof Writable && !writeStream.destroyed) writeStream.destroy();
      return messages.fail().concat(EOL);
    }
  } else {
    return messages.invalid().concat(EOL);
  }

  return '';
}