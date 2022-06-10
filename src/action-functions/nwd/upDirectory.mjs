import { Application } from './../../app.js';
import path from 'path';

export const upDirectory = (args) => {
  const arrPath = Application._currentPath
    .split(path.sep);
  if (arrPath.length > 1) {
    arrPath.pop();
    Application._currentPath = path.join(...arrPath, arrPath.length === 1 ? path.sep : '');
  }
  
  return '';
}