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
 * @typedef {Object} Hero
 * @prop {number} id
 * @prop {string} name
 * @prop {string} [originalName]
 */
/**
 * @typedef {Object} State
 * @prop {number} newId
 * @prop {Hero[]} heroes
 * @prop {string} activeComponent
 * @prop {Hero} selectedHero
 * @prop {string} newHero
 * @prop {string[]} searchResults
 * @prop {string} inputValue
 */

