'use strict';

import Ticket from './core/ticket.js';
import MachineKey from './core/machinekey.js';
import Serializer from './core/serializer.js';
import Crypto from './core/crypto.js';
import { parseMachineKey } from './core/parser.js';

/**
 * @exports
 * @default
 * @class
 * @module FormsAuthentication
 */
export default class FormsAuthentication {
  /**
   * @static
   * @private
   * @description The decryption algorithms
   * @type {string[]}
   */
  static #decryptionAlgorithms = [
    // Todo
  ];
  /**
   * @static
   * @private
   * @description The validation algorithms
   * @type {string[]}
   */
  static #validationAlgorithms = [
    'md5', 'MD5'
  ];

  /**
   * @static
   * @private
   * @description Validates ticket arguments
   * @throws {RangeError} If there's not enough arguments
   * @throws {TypeError} If the argument types don't match
   */
  static #validateTicket() {
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
   * @private
   * @description Validates machine key arguments
   * @throws {RangeError} If there's not enough arguments or the keys are invalid
   * @throws {TypeError} If the argument types don't match
   * @throws {ReferenceError} If the argument values are invalid
   */
  static #validateMachineKey() {
    const args = Object.values(arguments);

    if (!args[0] || args[0].length !== 4) {
      throw new RangeError('Machine key is expecting 4 arguments.');
    }

    const [decryption, decryptionKey, validation, validationKey] = args[0];

    if (typeof validation !== 'string') {
      throw new TypeError(`'validation' must be typeof string.`);
    }

    if (typeof validationKey !== 'string') {
      throw new TypeError(`'validationKey' must be typeof string.`);
    }

    if (!this.#validationAlgorithms.includes(validation)) {
      throw new ReferenceError(`'validation' must be a valid validation algorithm.`);
    }

    //  decryption="Auto" [Auto | DES | 3DES | AES]
    //  validation="HMACSHA256" [SHA1 | MD5 | 3DES | AES | HMACSHA256 | HMACSHA384 | HMACSHA512]

    // Todo: Validation
  }

  /**
   * @static
   * @description Parses a web config file to retrieve the machine key
   * @param {string} xml - The xml web config
   * @returns {MachineKey} The machine key
   */
  static parseWebConfig(xml) {
    const parsed = parseMachineKey(xml);
    const machineKey = this.createMachineKey(...parsed);

    return machineKey;
  }

  /**
   * @static
   * @description Creates a new ticket
   * @param {string} name - The user name associated with the forms-authentication ticket
   * @param {Date} expiration - The local date and time at which the forms-authentication ticket expires
   * @param {boolean} isPersistent - A value indicating whether the cookie that contains the forms-authentication ticket information is persistent
   * @param {string} userData - A user-specific string stored with the ticket
   * @param {string} cookiePath - The cookie path for the forms-authentication ticket
   * @returns {Ticket} The ticket
   */
  static createTicket(name, expiration, isPersistent, userData, cookiePath) {
    this.#validateTicket(arguments);

    const ticket = new Ticket(name, expiration, isPersistent, userData, cookiePath);

    return ticket;
  }

  /**
   * @static
   * @description Creates a new machine key
   * @param {string} decryption - The decryption algorithm to use
   * @param {string} decryptionKey - The decryption key to use
   * @param {string} validation - The validation algorithm to use
   * @param {string} validationKey - The validation key to use
   * @returns {MachineKey} The machine key
   */
  static createMachineKey(decryption, decryptionKey, validation, validationKey) {
    this.#validateMachineKey(arguments);

    const machineKey = new MachineKey(decryption, decryptionKey, validation, validationKey);

    return machineKey;
  }

  /**
   * @static
   * @description Serializes a ticket
   * @param {Ticket} ticket - The ticket to serialize
   * @throws {TypeError} If the ticket isn't instanceof Ticket
   * @returns {Buffer} The serialized ticket
   */
  static serialize(ticket) {
    if (!(ticket instanceof Ticket)) {
      throw new TypeError(`'ticket' must be instanceof Ticket.`);
    }

    const serialized = Serializer.serialize(ticket);

    return serialized;
  }

  /**
   * @static
   * @description Deserializes a ticket
   * @param {Buffer} buffer - The buffer containing a serialized ticket to deserialize
   * @throws {TypeError} If the buffer isn't typeof Buffer
   * @returns {Ticket} The deserialized ticket
   */
  static deserialize(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      throw new TypeError(`'buffer' must be typeof Buffer.`);
    }

    const deserialized = Serializer.deserialize(buffer);

    return deserialized;
  }

  /**
   * @static
   * @description Encrypt a ticket
   * @param {Buffer} buffer - The buffer containing a serialized ticket to encrypt
   * @param {MachineKey} machineKey - The machine key
   * @throws {TypeError} If the machine key isn't instanceof MachineKey or the buffer isn't typeof Buffer
   * @returns {Buffer} The encrypted serialized ticket
   */
  static encrypt(buffer, machineKey) {
    if (!Buffer.isBuffer(buffer)) {
      throw new TypeError(`'buffer' must be typeof Buffer.`);
    }

    if (!(machineKey instanceof MachineKey)) {
      throw new TypeError(`'machineKey' must be instanceof MachineKey.`);
    }

    // Todo
  }

  /**
   * @static
   * @description Decrypt a ticket
   * @param {Buffer} buffer - The buffer containing an encrypted ticket to decrypt
   * @returns {Buffer} - The decrypted serialized ticket
   */
  static decrypt(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      throw new TypeError(`'buffer' must be typeof Buffer.`);
    }

    // Todo
  }
}
