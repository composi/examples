export function noop() {}


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
 * Item object.
 * @typedef {Object} Item
 * @prop {string} product
 * @prop {number} price
 * @prop {number} quantity
 * @prop {number} [idx]
 */
/**
 * Application state.
 * @typedef {Object} State
 * @prop {string} inputValue
 * @prop {Item[]} items
 */


/**
 * Actions to match with tagged union.
 * @typedef {Object} ActionMethods
 * @prop {(item: {product: string, price: string, quantity: string}) => State} AddItem
 * @prop {(product: string) => State} DeleteItem
 * @prop {(item: {price: string, idx: string}) => State} UpdateItemPrice
 * @prop {(item: {quantity: string, idx: string}) => State} UpdateItemQuantity
*/

/**
 * Tagged union of messages.
 * @typedef {Object} MessageUnion
 * @prop {(msg: Message, Object: ActionMethods) => State} match
 * @prop {(item: {product: string, price: number, quantity: number}) => Message} AddItem
 * @prop {(product: string) => Message} DeleteItem
 * @prop {(item: {price: string, idx: string}) => Message} UpdateItemPrice
 * @prop {(item: {quantity: string, idx: string}) => Message} UpdateItemQuantity
 */