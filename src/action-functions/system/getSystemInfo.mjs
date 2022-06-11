import { messages } from "../../enums/messages.mjs";
import { cliArgsValidator } from "../../validators/cliArgsValidator.mjs";
import os, { EOL } from 'os';
import { getDefaultPath } from './paths.mjs'; 

const argsCount = 1;

export const getSystemInfo = async (args) => {
  const info = {};
  try {
    if (cliArgsValidator(args, argsCount, systemArgs)){
      info.result = systemArgs[args[0]]();
    } else {
      return messages.invalid().concat(EOL);
    }
  
    return info.result.toString().concat(EOL);

  } catch (error) {
    console.log(error);
  }
};

const getEol = () => {
  return JSON.stringify(`Default system End-Of-Line: ${EOL}`).replace(/^"|"$/g, '');
};

const getCpus = () => {
  const currentCpus = os.cpus();
  const formattedList = currentCpus.map((item, index) => {
    const parseNameCpu = (() => { 
      if (item.model.includes('@')) {
        const pos = item.model.lastIndexOf('@');
        return item.model.slice(0, pos);
      } else {
        return item.model;
      }
    })();

    const cpuSpeedGhz = (() => { 
      const delimiter = 1000;
        return `${(item.speed / delimiter).toFixed(2)} GHz`;
    })();

    return `${index + 1}. Model: ${parseNameCpu}${EOL}   Speed: ${cpuSpeedGhz}`;
  });
  
  return `Count CPUs : ${currentCpus.length}${EOL}${formattedList.join(EOL)}`;
};

const getHomedir = () => {
  return `Home directory: ${getDefaultPath()}`;
};

const getUsername = () => {
  return `Current system user name: ${os.userInfo().username}`;
};

const getArchitecture = () => {
  return `Current CPU architecture: ${os.arch()}`;
};

const systemArgs= Object.freeze({
  '--EOL': getEol,
  '--cpus': getCpus,
  '--homedir': getHomedir,
  '--username': getUsername,
  '--architecture': getArchitecture,
});