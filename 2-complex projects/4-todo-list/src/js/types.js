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
 * Item type.
 * @typedef {Object} Item
 * @prop {number} id
 * @prop {string} value
 * @prop {boolean} active
 * @prop {boolean} hidden
/**
 * Application state.
 * @typedef {Object} State
 * @prop {number} newKey
 * @prop {string} inputValue
 * @prop {boolean[]} selectedButton
 * @prop {Item[]} items
 */


/**
 * Actions to match with tagged union.
 * @typedef {Object} ActionMethods
 * @prop {() => State} AddItem
 * @prop {(key: number) => State} DeleteItem
 * @prop {(state: State) => State} RenderLocalState
 * @prop {(id: number) => State} SetActiveState
 * @prop {() => State} ShowActive
 * @prop {() => State} ShowAll
 * @prop {() => State} ShowCompleted
 * @prop {(value: string) => State} UpdateInputValue
 */

/**
 * Tagged union of messages.
 * @typedef {Object} MessageUnion
 * @prop {(msg: Message, Object: ActionMethods) => State} match
 * @prop {() => Message} AddItem
 * @prop {(key: number) => Message} DeleteItem
 * @prop {(state: State) => Message} RenderLocalState
 * @prop {(id: number) => Message} SetActiveState
 * @prop {() => Message} ShowActive
 * @prop {() => Message} ShowAll
 * @prop {() => Message} ShowCompleted
 * @prop {(value: string) => Message} UpdateInputValue
 */
