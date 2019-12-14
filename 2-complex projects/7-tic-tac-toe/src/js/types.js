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
 * @typedef {string} Square
 * @prop {Square[]} squares
 * @typedef {{squares: string[]}} Squares
 */
/**
 * @typedef {Object} State
 * @prop {number} stepNumber
 * @prop {boolean} xIsNext
 * @prop {Squares[]} history
 */

 /**
  * @typedef {Array} Winner
  * @prop {number[]} line
  */

/**
 * Actions to match with tagged union.
 * @typedef {Object} ActionMethods
 * @prop {(tile: number) => State} SelectTile
 * @prop {(jump: number) => State} JumpTo
 * @prop {(data: State) => State} UseFetchedData
*/

/**
 * Tagged union of messages.
 * @typedef {Object} MessageUnion
 * @prop {(msg: Message, Object: ActionMethods) => State} match
 * @prop {(tile: number) => Message} SelectTile
 * @prop {(jump: number) => Message} JumpTo
 * @prop {(data: State) => Message} UseFetchedData
 */
