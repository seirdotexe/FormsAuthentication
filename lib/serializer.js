'use strict'

import Tick from './tick.js';

/**
 * @typedef {import('./ticket').default} Ticket
 */

/**
 * @exports
 * @default
 * @class
 * @module Serializer
 */
export default class Serializer {
  /**
   * @static
   * @description Serializes a ticket
   * @param {Ticket} ticket - The ticket to serialize
   * @returns {Buffer} The serialized ticket
   */
  static serialize(ticket) {
    const buffer = Buffer.alloc(1 + 1 + 8 + 1 + 8 + 1);

    const issueTicks = BigInt(Tick.to(ticket.issueDate));
    const expireTicks = BigInt(Tick.to(ticket.expiration));

    buffer.writeUint8(1, 0);
    buffer.writeUint8(ticket.version, 1);
    buffer.writeBigUint64LE(issueTicks, 2);
    buffer.writeUint8(254, 10);
    buffer.writeBigInt64LE(expireTicks, 11);
    buffer.writeUint8(Number(ticket.isPersistent), 19);

    return buffer;
  }

  /*
  writer.writeUInt8(1);
  writer.writeUInt8(ticket.version);
  writer.writeDate(ticket.issueDate);
  writer.writeUInt8(254);
  writer.writeDate(ticket.expiration);
  writer.writeBoolean(ticket.isPersistent);
  writer.writeString(ticket.name);
  writer.writeString(ticket.userData);
  writer.writeString(ticket.cookiePath);
  writer.writeUInt8(255);
  */

  /**
   * @static
   * @description Deserializes a ticket
   * @param {Buffer} buffer - The buffer containing a serialized ticket to deserialize
   * @returns {Ticket} The deserialized ticket
   */
  static deserialize(buffer) {
    // Todo
  }
}