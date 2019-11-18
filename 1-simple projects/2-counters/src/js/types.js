export function noop() { }


/**
 * Core types for use with view, update, subscriptions and actions.
 * @typedef {import('@composi/core').Message} Message
 * @typedef {import('@composi/core').Send} Send
 * @typedef {import('@composi/core').Program} Program
 * @typedef {import('@composi/core').VNode} VNode
 * @typedef {string | number | undefined | null | VNode | VNode[]} Children
 * @typedef {import('@composi/core').Props} Props
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
