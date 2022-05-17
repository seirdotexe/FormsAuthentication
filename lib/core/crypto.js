'use strict';

import { randomBytes, createHmac, createCipheriv, createDecipheriv } from 'node:crypto';

/**
 * @exports
 * @default
 * @class
 * @module Crypto
 */
export default class Crypto {
  /**
   * @static
   * @description Creates a hash of a buffer to use for validation
   * @param {Buffer} data - The data to create a hash of
   * @param {string} algorithm - The algorithm to use
   * @param {string} key - The key to use
   * @returns {Buffer} The hash as a buffer
   */
  static hmac(data, algorithm, key) {
    const hash = createHmac(algorithm, key).update(data).digest();

    return hash;
  }
}
