import { createPath, isExistDir } from "../system/paths.mjs";
import path from 'path';
import { open, unlink } from "fs/promises";
import { messages } from "../../enums/messages.mjs";
import { EOL } from 'os';
import { cliArgsValidator } from "../../validators/cliArgsValidator.mjs";
import { pipeline } from "stream/promises";
import { Writable, Readable } from "stream";

const argsCount = 2;

export const moveFile = async (args) => {
  if (cliArgsValidator(args, argsCount)){
    const srcFilePath = createPath(args[0]);
    const destPath = createPath(args[1]);
    
    let destFilePath = null;
    let readStream = null;
    let writeStream = null;

    try {
      if ((await isExistDir(srcFilePath)) !== null) {
        throw new Error();
      }

      if ((await isExistDir(destPath)) !== null) {
        destFilePath = path.join(destPath, path.parse(srcFilePath).base);
      }

      readStream = (await open(srcFilePath, 'r'))
        .createReadStream();
      writeStream = (await open(destFilePath === null ? destPath : destFilePath, 'wx'))
        .createWriteStream();

      await pipeline(readStream, writeStream);
      await unlink(srcFilePath);
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