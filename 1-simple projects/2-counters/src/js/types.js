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
 * @typedef {Object} Counter
 * @prop {number} number
 * @prop {number} key
 */
/**
 * @typedef {Object} State
 * @prop {number} key
 * @prop {number} sum
 * @prop {Counter[]} counters
 */

/**
 * @typedef {Object} ActionMethods
  * @prop {() => State} AddCounter
  * @prop {(id: number) => State} Increase
  * @prop {(id: number) => State} Decrease
  * @prop {(id: number) => State} Delete
 */

/**
 * @typedef {Object} MessageUnion
 * @prop {(msg: Message, Object: ActionMethods) => void} match
 * @prop {() => Message} AddCounter
 * @prop {(id: number) => Message} Increase
 * @prop {(id: number) => Message} Decrease
 * @prop {(id: number) => Message} Delete
 */
