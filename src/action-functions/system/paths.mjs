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

export {
  getDefaultPath,
  isExistDir,
  isExistPathToFile,
  createPath
}