'use strict';

/**
 * @exports
 * @function
 * @description Parses the arguments of the machineKey in a web config
 * @param {string} xml - The xml web config
 * @throws {ReferenceError} If the web config is invalid
 * @returns {string[]} The arguments
 */
export function parseMachineKey(xml) {
  if (!xml.includes('machineKey')) {
    throw new ReferenceError('Invalid web config.');
  }

  const toParse = ['decryption', 'decryptionKey', 'validation', 'validationKey'];
  const parsed = [];
  const args = xml.split('machineKey')[1];

  for (let i = 0; i < toParse.length; i++) {
    const key = toParse[i];

    if (!args.includes(key)) {
      throw new ReferenceError('Invalid web config.');
    }

    parsed[i] = args.split(`${key}="`)[1].split('"')[0];
  }

  return parsed;
}
