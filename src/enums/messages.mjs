export const messages = Object.freeze({
  welcome: (userName) => { return `Welcome to the File Manager, ${userName}!` },
  currentPath: (curDir) => { return `You are currently in ${curDir}` },
  exitApp: (userName) => { return `Thank you for using File Manager, ${userName}!` },
  invalid: () => { return `Invalid input` },
  fail: () => { return `Operation failed` },
});