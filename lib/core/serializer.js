'use strict'

import Tick from './tick.js';
import Ticket from './ticket.js';

/**
 * @exports
 * @default
 * @class
 * @module Serializer
 */
export default class Serializer {
  /**
   * @static
   * @private
   * @description Calculates the amount of bytes needed to serialize a ticket
   * @param {number} nameLength - The name length
   * @param {number} userDataLength - The user data length
   * @param {number} cookiePathLength - The cookie path length
   * @returns {number} The size needed
   */
  static #calculateSize(nameLength, userDataLength, cookiePathLength) {
    let size = 0;

    size += 1; // Serialized ticket format version number
    size += 1; // Version
    size += 8; // Issue date ticks
    size += 1; // Spacer
    size += 8; // Expire date ticks
    size += 1; // Is persistent
    size += 1; // Name length
    size += nameLength; // Name string length
    size += 1; // User data length
    size += userDataLength; // User data string length
    size += 1; // Cookie path length
    size += cookiePathLength; // Cookie path string length
    size += 1; // Footer

    return size;
  }

  /**
   * @static
   * @description Serializes a ticket
   * @param {Ticket} ticket - The ticket to serialize
   * @returns {Buffer} The serialized ticket
   */
  static serialize(ticket) {
    const ticketStringLength = [ticket.name.length * 2, ticket.userData.length * 2, ticket.cookiePath.length * 2];
    const size = this.#calculateSize(...ticketStringLength);

    const buffer = Buffer.alloc(size);
    let position = 0;

    const issueTicks = BigInt(Tick.to(ticket.issueDate));
    const expireTicks = BigInt(Tick.to(ticket.expiration));

    buffer.writeUint8(1, position++);
    buffer.writeUint8(ticket.version, position++);
    buffer.writeBigUint64LE(issueTicks, position); position += 8;
    buffer.writeUint8(254, position++);
    buffer.writeBigInt64LE(expireTicks, position); position += 8;
    buffer.writeUint8(Number(ticket.isPersistent), position++);
    buffer.writeUint8(ticketStringLength[0], position++);
    buffer.write(ticket.name, position, ticketStringLength[0], 'utf16le'); position += ticketStringLength[0];
    buffer.writeUint8(ticketStringLength[1], position++);
    buffer.write(ticket.userData, position, ticketStringLength[1], 'utf16le'); position += ticketStringLength[1];
    buffer.writeUint8(ticketStringLength[2], position++);
    buffer.write(ticket.cookiePath, position, ticketStringLength[2], 'utf16le'); position += ticketStringLength[2];
    buffer.writeUint8(255, position++);

    return buffer;
  }

  /**
   * @static
   * @description Deserializes a ticket
   * @param {Buffer} buffer - The buffer containing a serialized ticket to deserialize
   * @returns {Ticket} The deserialized ticket
   */
  static deserialize(buffer) {
    let position = 0;

    if (buffer.readUint8(position++) === 1) {
      const version = buffer.readUint8(position++);
      const issueDate = Tick.from(Number(buffer.readBigUint64LE(position))); position += 8; //? No need to convert to Date

      if (buffer.readUint8(position++) === 254) {
        //? Expiration needs to be converted to a date because this is an active constructor argument
        const expiration = new Date(Tick.from(Number(buffer.readBigUint64LE(position)))); position += 8;
        const isPersistent = buffer.readUint8(position++);

        const nameLength = buffer.readUint8(position++);
        const name = buffer.subarray(position, position + nameLength).toString('utf16le'); position += nameLength;

        const userDataLength = buffer.readUint8(position++);
        const userData = buffer.subarray(position, position + userDataLength).toString('utf16le'); position += userDataLength;

        const cookiePathLength = buffer.readUint8(position++);
        const cookiePath = buffer.subarray(position, position + cookiePathLength).toString('utf16le'); position += cookiePathLength;

        if (buffer.readUint8(position++) === 255) {
          const ticket = new Ticket(name, expiration, isPersistent, userData, cookiePath, version, issueDate);

          return ticket;
        }
      }
    }
  }
}
