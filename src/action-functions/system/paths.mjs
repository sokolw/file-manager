import { opendir, access } from 'fs/promises';
import { constants } from 'fs';
import os, { EOL } from 'os';
import path from 'path';
import { Application } from './../../app.js';

const getDefaultPath = () => {
  return os.homedir();
}

const isExistDir = async (rawPath) => {
  const pathToDir = path.isAbsolute(rawPath) ? 
    rawPath : path.join(Application._currentPath, rawPath);

  try {
    const directory = await opendir(pathToDir);
    directory.close();
  } catch {
    return null;
  }

  return pathToDir;
}

const isExistPathToFile = async (rawPath) => {
  const pathToDir = await isExistDir(rawPath);
  if (pathToDir !== null) {
    return null;
  }

  const pathToFile = path.isAbsolute(rawPath) ? 
    rawPath : path.join(Application._currentPath, rawPath);

  try {
    await access(pathToFile, constants.F_OK);
    console.log('can access ' + pathToFile);
  } catch {
    console.log('cannot access '+ pathToFile);
    return null;
  }

  return pathToFile;
}

const createPath = (rawPath) => {
  return path.isAbsolute(rawPath) ? 
  rawPath : path.join(Application._currentPath, rawPath);
}

const parsePaths = (args) => {
  const space = ' ';
  const separator = '"';
  const storagePaths = { rawPaths : null, parsedPaths : [] };
  storagePaths.rawPaths = args.join(space);

  if (!storagePaths.rawPaths.includes(separator)) {
    return args;
  }

  let startPos = 0;
  let prevPos = 0;
  let countPos = 0;
  let flag = true;
  while (flag) {
    if (startPos > -1 && countPos < 1) {
      startPos = storagePaths.rawPaths.indexOf(separator, startPos);
      if (startPos > 0 && countPos === 0) {
        const parsedPath = storagePaths.rawPaths.slice(0, startPos).trim();
        storagePaths.parsedPaths.push(parsedPath);
      }

      countPos++;
    } else if (startPos > -1 && countPos < 2) {
      prevPos = startPos;
      startPos = storagePaths.rawPaths.indexOf(separator, prevPos + 1);
      countPos++;
    } else if (countPos === 2 && startPos > -1 && prevPos > -1) {
      const parsedPath = storagePaths.rawPaths.slice(prevPos + 1, startPos);
      storagePaths.rawPaths = storagePaths.rawPaths.slice(startPos + 2);
      countPos = 0;
      prevPos = 0;
      startPos = 0;
      storagePaths.parsedPaths.push(parsedPath);
    } else {
      if (storagePaths.rawPaths !== '') {
        storagePaths.parsedPaths.push(...storagePaths.rawPaths.split(space));
      }

      flag = false;
    }
  }

  return storagePaths.parsedPaths;
}

export {
  getDefaultPath,
  isExistDir,
  isExistPathToFile,
  createPath,
  parsePaths
}