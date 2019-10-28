export function noop() {}


/**
 * @typedef {import('@composi/core').Message} Message
 * @typedef {import('@composi/core').Send} Send
 * @typedef {import('@composi/core').Program} Program
 * @typedef {() => State} GetState
 */

/**
 * @typedef {Object} Item
 * @prop {string} product
 * @prop {number} price
 * @prop {number} quantity
 * @prop {number} [idx]
 */
/**
 * @typedef {Object} State
 * @prop {string} inputValue
 * @prop {Item[]} items
 */


/**
 * @typedef {Object} ActionMethods
 * @prop {(item: {product: string, price: string, quantity: string}) => State} addItem
 * @prop {(product: string) => State} deleteItem
 * @prop {(item: {price: string, idx: string}) => State} updateItemPrice
 * @prop {(item: {quantity: string, idx: string}) => State} updateItemQuantity
*/

/**
 * @typedef {Object} MessageUnion
 * @prop {(msg: Message, Object: ActionMethods) => State} match
 * @prop {(item: {product: string, price: number, quantity: number}) => Message} addItem
 * @prop {(product: string) => Message} deleteItem
 * @prop {(item: {price: string, idx: string}) => Message} updateItemPrice
 * @prop {(item: {quantity: string, idx: string}) => Message} updateItemQuantity
 */