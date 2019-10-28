export function noop() {}


/**
 * @typedef {import('@composi/core').Message} Message
 * @typedef {import('@composi/core').Send} Send
 * @typedef {import('@composi/core').Program} Program
 * @typedef {() => State} GetState
 */


/**
 * @typedef {Object} State
 * @prop {null | number} guess
 * @prop {string | Symbol} difficulty
 * @prop {string} [indicator]
 * @prop {string} [outcome]
 */

 /**
  * @typedef {Object} DifficultyLevel
  * @prop {Symbol} EASY
  * @prop {Symbol} MEDIUM
  * @prop {strSymboling} HARD
  */