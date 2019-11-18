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
 * @typedef {Object} Item
 * @prop {number} id
 * @prop {string} value
 * @prop {boolean} active
 * @prop {boolean} hidden
/**
 * @typedef {Object} State
 * @prop {number} newKey
 * @prop {string} inputValue
 * @prop {boolean[]} selectedButton
 * @prop {Item[]} items
 */

//UpdateInputValue', 'AddItem', 'DeleteItem', 'SetActiveState', 'ShowActive', '', 'ShowAll', 'RenderLocalState
 /**
  * @typedef {Object} ActionMethods
  * @prop {(value: string) => State} UpdateInputValue
  * @prop {() => State} AddItem
  * @prop {(key: number) => State} DeleteItem
  * @prop {(id: number) => State} SetActiveState
  * @prop {() => State} ShowActive
  * @prop {() => State} ShowCompleted
  * @prop {() => State} ShowAll
  * @prop {(state: State) => State} RenderLocalState
  */
 /**
  * @typedef {Object} MessageUnion
  * @prop {(msg: Message, Object: ActionMethods) => State} match
  * @prop {(value: string) => Message} UpdateInputValue
  * @prop {() => Message} AddItem
  * @prop {(key: number) => Message} DeleteItem
  * @prop {(id: number) => Message} SetActiveState
  * @prop {() => Message} ShowActive
  * @prop {() => Message} ShowCompleted
  * @prop {() => Message} ShowAll
  * @prop {(state: State) => Message} RenderLocalState
  */