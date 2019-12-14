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
