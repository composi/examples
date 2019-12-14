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
 * @prop {(item: {product: string, price: string, quantity: string}) => State} AddItem
 * @prop {(product: string) => State} DeleteItem
 * @prop {(item: {price: string, idx: string}) => State} UpdateItemPrice
 * @prop {(item: {quantity: string, idx: string}) => State} UpdateItemQuantity
*/

/**
 * @typedef {Object} MessageUnion
 * @prop {(msg: Message, Object: ActionMethods) => State} match
 * @prop {(item: {product: string, price: number, quantity: number}) => Message} AddItem
 * @prop {(product: string) => Message} DeleteItem
 * @prop {(item: {price: string, idx: string}) => Message} UpdateItemPrice
 * @prop {(item: {quantity: string, idx: string}) => Message} UpdateItemQuantity
 */
