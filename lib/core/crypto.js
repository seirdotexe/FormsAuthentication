'use strict';

import { getRandomValues, subtle, createHmac } from 'crypto';

/**
 * @exports
 * @default
 * @class
 * @module Crypto
 */
export default class Crypto {
  /**
   * @static
   * @description Generates a random key
   * @param {number} length - The length the key needs to be
   * @returns {string} The randomly generated key
   */
  static generateRandomKey(length) {
    const keyBuf = getRandomValues(Buffer.allocUnsafe(length / 2));
    const keyStr = keyBuf.toString('hex');

    return keyStr;
  }

  /**
   * @static
   * @description Hashes a string using HMAC+Algorithm
   * @param {Buffer} data - The data to hash
   * @param {string} algorithm - The algorithm to use
   * @param {string} key - The key to use
   * @returns {Buffer} The hashed data
   */
  static hmac(data, algorithm, key) {
    //? https://github.com/nodejs/node/issues/43040

    const hash = createHmac(algorithm, key).update(data).digest();

    return hash;
  }
}
