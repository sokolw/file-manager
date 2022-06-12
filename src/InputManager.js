import { Transform } from 'stream';
import { runFunctions } from './action-functions/runFunctions.mjs';
import { cliValidator } from './validators/cliValidator.mjs';
import { Application } from './app.js';
import { messages } from './enums/messages.mjs';
import { EOL } from 'os';


export class InputManager extends Transform {
  static _workingManager;

  constructor(options) {
    super(options);
    InputManager._workingManager = this;
  }

  async _transform(data, encoding, callback) {
    let validation = null;
    try {
      validation = await cliValidator(data);
    } catch {
      validation = { status : false };
    }

    if (validation.status) {
      const result = await runFunctions(validation.result);
      callback(null, `${result}${messages.currentPath(Application._currentPath).concat(EOL)}`);
    } else {
      callback(null, messages.invalid().concat(EOL).concat(messages.currentPath(Application._currentPath)).concat(EOL));
    }
  };
}