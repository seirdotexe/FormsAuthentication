'use strict';

import { randomBytes, createHmac, createCipheriv, createDecipheriv, timingSafeEqual } from 'node:crypto';

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

  /**
   * @static
   * @description Compares two buffer sources to verify if they're equal
   * @param {Buffer} a - Buffer source #1
   * @param {Buffer} b - Buffer source #2
   * @returns {boolean} If the two buffer sources are equal
   */
  static verify(a, b) {
    const valid = timingSafeEqual(a, b);

    return valid;
  }
}
