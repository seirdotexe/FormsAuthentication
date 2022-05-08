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
}
