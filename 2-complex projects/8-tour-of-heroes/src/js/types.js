export function noop() {}


/**
 * @typedef {import('@composi/core').Message} Message
 * @typedef {import('@composi/core').Send} Send
 * @typedef {import('@composi/core').Program} Program
 * @typedef {() => State} GetState
 */

/**
 * @typedef {Object} Hero
 * @prop {number} id
 * @prop {string} name
 * @prop {string} [originalName]
 */
/**
 * @typedef {Object} State
 * @prop {number} newId
 * @prop {Hero[]} heroes
 * @prop {string} activeComponent
 * @prop {Hero} selectedHero
 * @prop {string} newHero
 */
