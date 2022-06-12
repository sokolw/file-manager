import { cliArgsValidator } from "../../validators/cliArgsValidator.mjs";
import { createPath, isExistDir } from "../system/paths.mjs";
import { open } from 'fs/promises';
import zlib from 'zlib';
import { messages } from "../../enums/messages.mjs";
import { EOL } from "os";
import { pipeline } from "stream/promises";
import { Writable, Readable } from "stream";
import path from "path";

const argsCount = 2;
const extCompress = '.br';

export const compressFile = async (args) => {
  if (cliArgsValidator(args, argsCount)){
    const workPaths = {
      srcFilePath : createPath(args[0]),
      destPath : createPath(args[1]),
    };
    const streams = {};

    try {
      if ((await isExistDir(workPaths.srcFilePath)) !== null) {
        throw new Error('It is not file!');
      }

      if ((await isExistDir(workPaths.destPath)) !== null) {
        workPaths.destPath = path.join(
          workPaths.destPath, 
          path.parse(workPaths.srcFilePath).base.concat(extCompress));
      } else {
        workPaths.destPath = workPaths.destPath.concat(extCompress);
      }

      streams.read = (await open(workPaths.srcFilePath, 'r'))
        .createReadStream();
      streams.write = (await open(workPaths.destPath, 'wx'))
        .createWriteStream();
      streams.brotli = zlib.createBrotliCompress();

      await pipeline(streams.read, streams.brotli, streams.write);

    } catch {
      if (streams.read instanceof Readable && !streams.read.destroyed) streams.read.destroy();
      if (streams.write instanceof Writable && !streams.write.destroyed) streams.write.destroy();
      if (streams.brotli instanceof zlib.BrotliCompress && !streams.brotli.destroyed) streams.brotli.destroy();
      return messages.fail().concat(EOL);
    }
  } else {
    return messages.invalid().concat(EOL);
  }

  return '';
}