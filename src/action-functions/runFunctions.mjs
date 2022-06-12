import { cliCommands } from '../enums/cliCommands.mjs'
import { messages } from '../enums/messages.mjs';
import { EOL } from 'os';

export const runFunctions = async (args) => {
  try {
    const action = cliCommands[args[0]];
    return await action(args.slice(1));
  } catch (error) {
    return messages.fail().concat(EOL);
  }
};