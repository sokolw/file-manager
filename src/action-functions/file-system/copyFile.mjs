import { createPath, isExistDir, parsePaths } from '../system/paths.mjs';
import path from 'path';
import { open } from 'fs/promises';
import { messages } from '../../enums/messages.mjs';
import { EOL } from 'os';
import { cliArgsValidator } from '../../validators/cliArgsValidator.mjs';
import { Writable, Readable } from 'stream';

const argsCount = 2;

export const copyFile = async (args) => {
  const argsParsed = parsePaths(args);

  if (cliArgsValidator(argsParsed, argsCount)){
    const workPaths = {
      srcFilePath : createPath(argsParsed[0]),
      destPath : createPath(argsParsed[1]),
    };
    const streams = {};

    try {
      if ((await isExistDir(workPaths.srcFilePath)) !== null) {
        throw new Error('It is not file!');
      }

      if ((await isExistDir(workPaths.destPath)) !== null) {
        workPaths.destPath = path.join(
          workPaths.destPath,
          path.parse(workPaths.srcFilePath).base);
      }

      streams.read = (await open(workPaths.srcFilePath, 'r'))
        .createReadStream();
      streams.write = (await open(workPaths.destPath, 'wx+'))
        .createWriteStream();

      let flag = true;
      while (flag) {
        const chunk = await readChunk(streams.read);
        if (chunk !== null) {
          if (streams.write.writable) {
            streams.write.write(chunk);
          }
        } else {
          flag = false;
        }
      }

      if (streams.read instanceof Readable && !streams.read.destroyed) streams.read.destroy();
      if (streams.write instanceof Writable && !streams.write.destroyed) streams.write.destroy();

    } catch(err) {
      console.log(err);
      if (streams.read instanceof Readable && !streams.read.destroyed) streams.read.destroy();
      if (streams.write instanceof Writable && !streams.write.destroyed) streams.write.destroy();
      return messages.fail().concat(EOL);
    }

  } else {
    return messages.invalid().concat(EOL);
  }

  return '';
};

const readChunk = async (readStream) => {
  return new Promise((resolve, reject) => {
    const callback = () => { resolve(null); };
    readStream.once('end', callback);
    readStream.once('data', (data) => {
      readStream.removeListener('end', callback);
      readStream.pause();
      resolve(data);
    });

    if (readStream.isPaused()) {
      readStream.resume();
    }

    if (!readStream.readable) {
      resolve(null);
    }

  });
};