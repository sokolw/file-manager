import os from 'os';

const getDefaultPath = async () => {
  return os.homedir();
}

export {
  getDefaultPath
}