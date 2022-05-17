'use strict';

/**
 * @exports
 * @default
 * @class
 * @module Validator
 */
export default class Validator {
  /**
   * @static
   * @readonly
   * @description The decryption algorithms
   * @type {string[]}
   */
  static decryptionAlgorithms = Object.freeze([
    // Todo
    'aes'
  ]);
  /**
   * @static
   * @readonly
   * @description The validation algorithms
   * @type {string[]}
   */
  static validationAlgorithms = Object.freeze([
    // Todo
    'md5', 'md4',
    'sm3',
    'sha1', 'sha224', 'sha256', 'sha384', 'sha512',
    'sha512-224', 'sha512-256',
    'sha3-224', 'sha3-256', 'sha3-384', 'sha3-512'
  ]);

  /**
   * @static
   * @description Validates ticket arguments
   * @throws {RangeError} If there's not enough arguments
   * @throws {TypeError} If the argument types don't match
   */
  static validateTicketArguments() {
    const args = Object.values(arguments);

    if (!args[0] || args[0].length !== 5) {
      throw new RangeError('Ticket is expecting 5 arguments.');
    }

    const [name, expiration, isPersistent, userData, cookiePath] = args[0];

    if (typeof name !== 'string') {
      throw new TypeError(`'name' must be typeof string.`);
    }

    if (!(expiration instanceof Date)) {
      throw new TypeError(`'expiration' must be instanceof Date.`);
    }

    if (typeof isPersistent !== 'boolean') {
      throw new TypeError(`'isPersistent' must be typeof boolean.`);
    }

    if (typeof userData !== 'string') {
      throw new TypeError(`'userData' must be typeof string.`);
    }

    if (typeof cookiePath !== 'string') {
      throw new TypeError(`'cookiePath' must be typeof string.`);
    }
  }

  /**
   * @static
   * @description Validates machine key arguments
   * @throws {RangeError} If there's not enough arguments or the keys are invalid
   * @throws {TypeError} If the argument types don't match
   * @throws {ReferenceError} If the argument values are invalid
   */
  static validateMachineKeyArguments() {
    const args = Object.values(arguments);

    if (!args[0] || args[0].length !== 4) {
      throw new RangeError('Machine key is expecting 4 arguments.');
    }

    const [decryption, decryptionKey, validation, validationKey] = args[0];

    if (typeof decryption !== 'string') {
      throw new TypeError(`'decryption' must be typeof string.`);
    }

    if (typeof decryptionKey !== 'string') {
      throw new TypeError(`'decryptionKey' must be typeof string.`);
    }

    if (!this.decryptionAlgorithms.includes(decryption.toLowerCase())) {
      throw new ReferenceError(`'decryption' must be a valid decryption algorithm.`);
    }

    if (typeof validation !== 'string') {
      throw new TypeError(`'validation' must be typeof string.`);
    }

    if (typeof validationKey !== 'string') {
      throw new TypeError(`'validationKey' must be typeof string.`);
    }

    if (!this.validationAlgorithms.includes(validation.toLowerCase())) {
      throw new ReferenceError(`'validation' must be a valid validation algorithm.`);
    }
  }
}
