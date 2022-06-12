import { messages } from "../../enums/messages.mjs";
import { cliArgsValidator } from "../../validators/cliArgsValidator.mjs";

const argsCount = 0;

export const exitProgram = async (args) => {
  try {
    if (cliArgsValidator(args, argsCount)){
      process.emit('.exit');
    } else {
      return messages.invalid().concat(EOL);
    }
  
    return '';
  } catch (error) {
    console.log(error);
  }
  
};