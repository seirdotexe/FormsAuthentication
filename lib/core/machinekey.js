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
   * @description Overwrite for custom inspect functions
   * @returns {string} The custom string showing the MachineKey class
   */
  [Symbol.for('nodejs.util.inspect.custom')]() {
    return `Ticket {
      \r  decryption: '${this.#decryption}',
      \r  decryptionKey: '${this.#decryptionKey}',
      \r  validation: '${this.#validation}',
      \r  validationKey: '${this.#validationKey}',
      \r  validationKeyLength: ${this.validationKeyLength}
    \r}`
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

  /**
   * @description Returns the validation key length of its algorithm in bytes
   * @returns {number} The validation key length
   */
  get validationKeyLength() {
    const validation = this.#validation.toLowerCase();

    if (validation === 'md5' || validation === 'md4') {
      return 16; //? 128/8
    } else if (validation === 'sha1') {
      return 20; //? 160/8
    } else if (validation === 'sha224' || validation === 'sha512-224' || validation === 'sha3-224') {
      return 28; //? 224/8
    } else if (validation === 'sha256' || validation === 'sha512-256' || validation === 'sha3-256' || validation === 'sm3') {
      return 32; //? 256/8
    } else if (validation === 'sha384' || validation === 'sha3-384') {
      return 48; //? 384/8
    } else if (validation == 'sha512' || validation === 'sha3-512') {
      return 64; //? 512/8
    }
  }
}
