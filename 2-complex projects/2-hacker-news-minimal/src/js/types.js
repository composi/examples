export function noop() {}


/**
 * @typedef {import('@composi/core').Message} Message
 * @typedef {import('@composi/core').Send} Send
 * @typedef {import('@composi/core').Program} Program
 * @typedef {() => State} GetState
 */

/**
 * @typedef {Object} Item
 * @prop {string} by
 * @prop {number} descendants
 * @prop {number} id
 * @prop {number[]} kids
 * @prop {number} score
 * @prop {number} time
 * @prop {string} title
 * @prop {string} type
 * @prop {string} url
 */
/**
 * @typedef {Object} State
 * @prop {Date} lastUpdate
 * @prop {Item[]} items
 */

