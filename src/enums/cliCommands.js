import { changeDirectory } from "../action-functions/nwd/changeDirectory.mjs";
import { getListFiles } from "../action-functions/nwd/getListFiles.mjs";
import { upDirectory } from "../action-functions/nwd/upDirectory.mjs";
import { readFile } from 'fs/promises';

export const cliCommands = Object.freeze({
  // Navigation & working directory (nwd)
  up: upDirectory,
  cd: changeDirectory,
  ls: getListFiles,
  // Work with files
  cat: readFile,
  add: 4,
  rn: 5,
  cp: 6,
  mv: 7,
  rm: 8,
  os: 9,
  '--EOL': 10,
  '--cpus': 11,
  '--homedir': 12,
  '--username': 13,
  '--architecture': 14,
  hash: 15,
  compress: 16,
  decompress: 17,
  '.exit': 18,
  
});