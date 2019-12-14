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
 * @typedef {Object} State
 * @prop {null | number} guess
 * @prop {string | Symbol} difficulty
 * @prop {string} [indicator]
 * @prop {string} [outcome]
 */

/**
 * @typedef {Object} DifficultyLevel
 * @prop {Symbol} EASY
 * @prop {Symbol} MEDIUM
 * @prop {strSymboling} HARD
 */
