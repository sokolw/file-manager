import { pipeline } from 'stream/promises';
import { InputManager } from './InputManager.js';
import { cliCommands } from './enums/cliCommands.mjs';
import { argsValidator } from './validators/argsValidator.mjs';
import { getDefaultPath } from './action-functions/system/paths.mjs'

class Application {
  static _userName;

  constructor(args) {
    this._userName = argsValidator(args);
    this.start();
  }

  async start() {
    console.log(`Welcome to the File Manager, ${this._userName}!`);
    console.log(`You are currently in ${await getDefaultPath()}`);
    const inputManager = new InputManager();

    process.on('SIGINT', () => { console.log('Close process!'); process.exit(); });

    await pipeline(process.stdin, inputManager, process.stdout);
  }
}

// line to run app file-manager
global.app = new Application(process.argv.slice(2));