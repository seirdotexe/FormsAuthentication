'use strict';

import Ticket from '../lib/ticket.js';

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
   * @description Creates a new ticket
   * @param {string} name - The user name associated with the forms-authentication ticket
   * @param {Date} expiration - The local date and time at which the forms-authentication ticket expires
   * @param {boolean} isPersistent - A value indicating whether the cookie that contains the forms-authentication ticket information is persistent
   * @param {string} userData - A user-specific string stored with the ticket
   * @param {string} cookiePath - The cookie path for the forms-authentication ticket
   * @returns {Ticket}
   */
  static createTicket(name, expiration, isPersistent, userData, cookiePath) {
    this.#validateTicket(arguments);

    const ticket = new Ticket(name, expiration, isPersistent, userData, cookiePath);

    return ticket;
  }
}
