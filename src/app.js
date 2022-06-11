import { pipeline } from 'stream/promises';
import { InputManager } from './InputManager.js';
import { cliCommands } from './enums/cliCommands.mjs';
import { argsValidator } from './validators/argsValidator.mjs';
import { getDefaultPath } from './action-functions/system/paths.mjs'
import { messages } from './enums/messages.mjs';

export class Application {
  static _userName;
  static _currentPath;

  constructor(args) {
    Application._userName = argsValidator(args);
    Application._currentPath = getDefaultPath();
    this.start();
  }

  async start() {
    console.log(messages.welcome(Application._userName));
    console.log(messages.currentPath(Application._currentPath));
    const inputManager = new InputManager();

    process.on('SIGINT', () => { console.log(messages.exitApp(Application._userName)); process.exit(); });
    process.on('.exit', () => { console.log(messages.exitApp(Application._userName)); process.exit(); });

    await pipeline(process.stdin, inputManager, process.stdout);
  }
}

// line to run app file-manager
global.app = new Application(process.argv.slice(2));