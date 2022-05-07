'use strict';

/**
 * @exports
 * @default
 * @class
 * @module Tick
 */
export default class Tick {
  /**
   * @static
   * @private
   * @description The number of ticks at the unix epoch
   * @type {number}
   */
  static #epochTicks = 621_355_968_000_000_000;
  /**
   * @static
   * @private
   * @description There are 10000 ticks per millisecond
   * @type {number}
   */
  static #ticksPerMillisecond = 10000;

  /**
   * @static
   * @description Converts time to ticks
   * @param {number} time - The time to convert to ticks
   * @returns {number} The ticks
   */
  static to(time) {
    const ticks = time * this.#ticksPerMillisecond + this.#epochTicks;

    return ticks;
  }

  /**
   * @static
   * @description Converts ticks to time
   * @param {number} ticks - The ticks to convert to time
   * @returns {number} The time
   */
  static from(ticks) {
    const time = (ticks - this.#epochTicks) / this.#ticksPerMillisecond;

    // Todo: Is this right?
    return Math.floor(time);
  }
}
