export function noop() {}


/**
 * @typedef {import('@composi/core').Message} Message
 * @typedef {import('@composi/core').Send} Send
 * @typedef {import('@composi/core').Program} Program
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
 * @typedef {Object} ActionMethods
 * @prop {(tile: number) => State} selectTile
 * @prop {(jump: number) => State} jumpTo
 * @prop {(data: State) => State} useFetchedData
*/

/**
 * @typedef {Object} MessageUnion
 * @prop {(msg: Message, Object: ActionMethods) => State} match
 * @prop {(tile: number) => Message} selectTile
 * @prop {(jump: number) => Message} jumpTo
 * @prop {(data: State) => Message} useFetchedData
 */