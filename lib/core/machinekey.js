'use strict';

/**
 * @exports
 * @default
 * @class
 * @module MachineKey
 */
export default class MachineKey {
  /**
   * @private
   * @description The decryption algorithm to use
   * @type {string}
   */
  #decryption;
  /**
   * @private
   * @description The decryption key to use
   * @type {string}
   */
  #decryptionKey;
  /**
   * @private
   * @description The validation algorithm to use
   * @type {string}
   */
  #validation;
  /**
   * @private
   * @description The validation key to use
   * @type {string}
   */
  #validationKey;

  /**
   * @constructor
   * @param {string} decryption - The decryption algorithm to use
   * @param {string} decryptionKey - The decryption key to use
   * @param {string} validation - The validation algorithm to use
   * @param {string} validationKey - The validation key to use
   */
  constructor(decryption, decryptionKey, validation, validationKey) {
    /**
     * @private
     * @description The decryption algorithm to use
     * @type {string}
     */
    this.#decryption = decryption;
    /**
     * @private
     * @description The decryption key to use
     * @type {string}
     */
    this.#decryptionKey = decryptionKey;
    /**
     * @private
     * @description The validation algorithm to use
     * @type {string}
     */
    this.#validation = validation;
    /**
     * @private
     * @description The validation key to use
     * @type {string}
     */
    this.#validationKey = validationKey;
  }

  /**
   * @description The decryption algorithm to use
   * @returns {string}
   */
  get decryption() {
    return this.#decryption;
  }

  /**
   * @description The decryption key to use
   * @returns {string}
   */
  get decryptionKey() {
    return this.#decryptionKey;
  }

  /**
   * @description The validation algorithm to use
   * @returns {string}
   */
  get validation() {
    return this.#validation;
  }

  /**
   * @description The validation key to use
   * @returns {string}
   */
  get validationKey() {
    return this.#validationKey;
  }
}
