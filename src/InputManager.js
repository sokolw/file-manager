import { createReadStream } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { Transform } from 'stream';
import { pipeline } from 'stream/promises';
import { runFunctions } from './action-functions/runFunctions.mjs';
import { cliValidator } from './validators/cliValidator.mjs';


export class InputManager extends Transform {
  constructor(options) {
    super(options);
  }

  async _transform(data, encoding, callback) {
    const validation = await cliValidator(data);
    if (validation.status) {
      const result = await runFunctions(validation.result);
      // callback(null, `Validation result: ${validation.result.join(', ')}\n`);
      callback(null, `Function: ${result}\n`)
    } else {
      callback(null, 'Invalid input\n');
    }
    // console.log(path.join('F:\\RSS SCHOOL Node.js\\file-manager','..'))
    // callback(null, `manage ${data}`);
  };
}


/* test chunks in async _transform(data, encoding, callback) {tuta}
    const rand = Math.random();
    if (rand > 0.5) {
      await new Promise((resolve, reject) => {
        const readStr = new createReadStream('./src/app.js')
        readStr.on('data', (data) => {
          this.push(data);
        });
        readStr.on('end', () => {
          this.push('\n');
          resolve('ok');
        });
      });
      
      this.push(`${rand}\n`);
      callback(null, `end OK ${data}`);
    } else {
      callback(null, `end OK ${data}`);
    }
    */