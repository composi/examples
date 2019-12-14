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

