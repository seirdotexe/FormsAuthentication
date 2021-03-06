'use strict';

/**
 * @exports
 * @default
 * @class
 * @module Ticket
 */
export default class Ticket {
  /**
   * @private
   * @description The version number of the ticket
   * @type {number}
   */
  #version;
  /**
   * @private
   * @description The local date and time at which the forms-authentication ticket was originally issued
   * @type {number}
   */
  #issueDate;
  /**
   * @private
   * @description The local date and time at which the forms-authentication ticket expires
   * @type {number}
   */
  #expiration;
  /**
   * @private
   * @description A value indicating whether the cookie that contains the forms-authentication ticket information is persistent
   * @type {boolean}
   */
  #isPersistent;
  /**
   * @private
   * @description The user name associated with the forms-authentication ticket
   * @type {string}
   */
  #name;
  /**
   * @private
   * @description A user-specific string stored with the ticket
   * @type {string}
   */
  #userData;
  /**
   * @private
   * @description The cookie path for the forms-authentication ticket
   * @type {string}
   */
  #cookiePath;

  /**
   * @constructor
   * @param {string} name - The user name associated with the forms-authentication ticket
   * @param {Date} expiration - The local date and time at which the forms-authentication ticket expires
   * @param {boolean} isPersistent - A value indicating whether the cookie that contains the forms-authentication ticket information is persistent
   * @param {string} userData - A user-specific string stored with the ticket
   * @param {string} cookiePath - The cookie path for the forms-authentication ticket
   * @param {number} [version=2] - The version number of the ticket
   * @param {number} [issueDate=Date.now()] - The local date and time at which the forms-authentication ticket was originally issued
   */
  constructor(name, expiration, isPersistent, userData, cookiePath, version = 2, issueDate = Date.now()) {
    /**
     * @private
     * @description The version number of the ticket
     * @type {number}
     */
    this.#version = version;
    /**
     * @private
     * @description The local date and time at which the forms-authentication ticket was originally issued
     * @type {number}
     */
    this.#issueDate = issueDate;
    /**
     * @private
     * @description The local date and time at which the forms-authentication ticket expires
     * @type {number}
     */
    this.#expiration = expiration.getTime();
    /**
     * @private
     * @description A value indicating whether the cookie that contains the forms-authentication ticket information is persistent
     * @type {boolean}
     */
    this.#isPersistent = isPersistent;
    /**
     * @private
     * @description The user name associated with the forms-authentication ticket
     * @type {string}
     */
    this.#name = name;
    /**
     * @private
     * @description A user-specific string stored with the ticket
     * @type {string}
     */
    this.#userData = userData;
    /**
     * @private
     * @description The cookie path for the forms-authentication ticket
     * @type {string}
     */
    this.#cookiePath = cookiePath;
  }

  /**
   * @description Overwrite for custom inspect functions
   * @returns {string} The custom string showing the Ticket class
   */
  [Symbol.for('nodejs.util.inspect.custom')]() {
    return `Ticket {
      \r  version: ${this.#version},
      \r  issueDate: ${this.#issueDate},
      \r  expiration: ${this.#expiration},
      \r  expired: ${this.expired},
      \r  isPersistent: ${this.#isPersistent},
      \r  name: '${this.#name}',
      \r  userData: '${this.#userData}',
      \r  cookiePath: '${this.#cookiePath}'
    \r}`
  }

  /**
   * @description The version number of the ticket
   * @returns {number}
   */
  get version() {
    return this.#version;
  }

  /**
   * @description The local date and time at which the forms-authentication ticket was originally issued
   * @returns {number}
   */
  get issueDate() {
    return this.#issueDate;
  }

  /**
   * @description The local date and time at which the forms-authentication ticket expires
   * @returns {number}
   */
  get expiration() {
    return this.#expiration;
  }

  /**
   * @description A value indicating whether the forms-authentication ticket has expired
   * @returns {boolean}
   */
  get expired() {
    return Date.now() > this.#expiration;
  }

  /**
   * @description A value indicating whether the cookie that contains the forms-authentication ticket information is persistent
   * @returns {boolean}
   */
  get isPersistent() {
    return this.#isPersistent;
  }

  /**
   * @description The user name associated with the forms-authentication ticket
   * @returns {string}
   */
  get name() {
    return this.#name;
  }

  /**
   * @description A user-specific string stored with the ticket
   * @returns {string}
   */
  get userData() {
    return this.#userData;
  }

  /**
   * @description The cookie path for the forms-authentication ticket
   * @returns {string}
   */
  get cookiePath() {
    return this.#cookiePath;
  }
}
