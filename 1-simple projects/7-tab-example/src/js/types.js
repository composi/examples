export function noop() {}


/**
 * @typedef {import('@composi/core').Message} Message
 * @typedef {import('@composi/core').Send} Send
 * @typedef {import('@composi/core').Program} Program
 * @typedef {import('@composi/core').VNode} VNode
 * @typedef {string | number | undefined | null | VNode | VNode[]} Children
 * @typedef {import('@composi/core').Props} Props
 * @typedef {() => State} GetState
 */

/**
 * @typedef {Object} Tab
 * @prop {string} id
 * @prop {string} label
 * @prop {string} description
 */
 /**
 * @typedef {Object} State
 * @prop {string} activeId
 * @prop {Tab[]} tabs
 */
