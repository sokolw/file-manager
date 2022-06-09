import { cliCommands } from "../enums/cliCommands.mjs"

export const runFunctions = async (args) => {
  const action = cliCommands[args[0]];
  return await action(args.slice(1));
}