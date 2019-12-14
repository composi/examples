export function noop() {}


/**
 * @typedef {import('@composi/core/types').Message} Message
 * @typedef {import('@composi/core/types').Send} Send
 * @typedef {import('@composi/core/types').Program} Program
 * @typedef {import('@composi/core/types').VNode} VNode
 * @typedef {string | number | undefined | null | VNode | VNode[]} Children
 * @typedef {import('@composi/core/types').Props} Props
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
