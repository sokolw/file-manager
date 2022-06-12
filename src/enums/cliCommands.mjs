import { changeDirectory } from "../action-functions/nwd/changeDirectory.mjs";
import { getListFiles } from "../action-functions/nwd/getListFiles.mjs";
import { upDirectory } from "../action-functions/nwd/upDirectory.mjs";
import { readFile } from '../action-functions/file-system/readFile.mjs';
import { createEmptyFile } from "../action-functions/file-system/createEmptyFile.mjs";
import { renameFile } from "../action-functions/file-system/renameFile.mjs";
import { copyFile } from "../action-functions/file-system/copyFile.mjs";
import { moveFile } from "../action-functions/file-system/moveFile.mjs";
import { deleteFile } from "../action-functions/file-system/deleteFile.mjs";
import { getSystemInfo } from "../action-functions/system/getSystemInfo.mjs";
import { calculateHash } from "../action-functions/file-system/calculateHash.mjs";
import { compressFile } from "../action-functions/file-system/compressFile.mjs";
import { decompressFile } from "../action-functions/file-system/decompressFile.mjs";
import { exitProgram } from "../action-functions/system/exitProgram.mjs";

export const cliCommands = Object.freeze({
  // Navigation & working directory dir/nwd
  up: upDirectory,
  cd: changeDirectory,
  ls: getListFiles,
  // Work with files dir/file-system
  cat: readFile,
  add: createEmptyFile,
  rn: renameFile,
  cp: copyFile,
  mv: moveFile,
  rm: deleteFile,
  hash: calculateHash,
  compress: compressFile,
  decompress: decompressFile,
  // System dir/system
  os: getSystemInfo,
  '.exit': exitProgram,
});