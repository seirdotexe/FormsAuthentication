'use strict';

import Ticket from './core/ticket.js';
import MachineKey from './core/machinekey.js';
import Serializer from './core/serializer.js';
import Validator from './core/validator.js';
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
    Validator.validateTicketArguments(arguments);

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
    Validator.validateMachineKeyArguments(arguments);

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

    const hash = Crypto.hmac(buffer, machineKey.validation, machineKey.validationKey);
    const verified = Buffer.concat([buffer, hash]);

    return verified; //! Temporary

    // Todo
    //? https://referencesource.microsoft.com/#system.web/Security/FormsAuthentication.cs,281
  }

  /**
   * @static
   * @description Decrypt a ticket
   * @param {Buffer} buffer - The buffer containing an encrypted ticket to decrypt
   * @param {MachineKey} machineKey - The machine key
   * @throws {TypeError} If the machine key isn't instanceof MachineKey or the buffer isn't typeof Buffer
   * @throws {ReferenceError} If the ticket is of an invalid format
   * @returns {Buffer} - The decrypted serialized ticket
   */
  static decrypt(buffer, machineKey) {
    if (!Buffer.isBuffer(buffer)) {
      throw new TypeError(`'buffer' must be typeof Buffer.`);
    }

    if (!(machineKey instanceof MachineKey)) {
      throw new TypeError(`'machineKey' must be instanceof MachineKey.`);
    }

    const serializedTicket = buffer.subarray(0, buffer.length - machineKey.validationKeyLength);
    const hash = buffer.subarray(buffer.length - machineKey.validationKeyLength);
    const compareHash = Crypto.hmac(serializedTicket, machineKey.validation, machineKey.validationKey);
    const isValid = Crypto.verify(compareHash, hash);

    if (!isValid) {
      throw new ReferenceError('The ticket you are trying to decrypt is of an invalid format.');
    }

    // Todo
  }
}
