export function noop() {}


/**
 * @typedef {import('@composi/core').Message} Message
 * @typedef {import('@composi/core').Send} Send
 * @typedef {import('@composi/core').Program} Program
 * @typedef {() => State} GetState
 */

 /**
  * @typedef {Object} Character
  * @prop {string} name
  * @prop {string} image
  * @prop {string} description
  * @prop {string} age
  * @prop {string} status
  * @prop {string[]} job
  * @prop {string} placeOfOrigin
  * @prop {string} id
  */
/**
 * @typedef {Object} State
 * @prop {boolean} dashboard
 * @prop {string} inputValue
 * @prop {Character} [character]
 * @prop {Character[]} [characters]
 */
