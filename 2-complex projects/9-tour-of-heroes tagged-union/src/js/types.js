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
 * Hero object.
 * @typedef {Object} Hero
 * @prop {number} id
 * @prop {string} name
 * @prop {string} [originalName]
 */

/**
 * Application state.
 * @typedef {Object} State
 * @prop {number} newId
 * @prop {Hero[]} heroes
 * @prop {string} activeComponent
 * @prop {Hero} selectedHero
 * @prop {string} NewHero
 * @prop {number} detail
 * @prop {Hero[]} searchResults
 */

/**
 * Actions to match with tagged union.
 * @typedef {Object} ActionMethods
 * @prop {(activeComponent: string) => State} ActiveComponent
 * @prop {() => State} AddHero
 * @prop {(name: string) => State} ChangeHeroName
 * @prop {(id: number) => State} DeleteHero
 * @prop {(name: string) => State} NewHero
 * @prop {() => State} ResetName
 * @prop {() => State} ResetSearchResults
 * @prop {(data: State) => State} SaveLocally
 * @prop {() => State} SaveName
 * @prop {(value: string) => State} Search
 * @prop {(id: number) => State} ShowDetail
 * @prop {(data: State) => State} UseFetchedHeroes
 */

/**
 * Tagged union of messages.
 * @typedef {Object} MessageUnion
 * @prop {(msg: Message, Object: ActionMethods) => State} match
 * @prop {(activeComponent: string) => Message} ActiveComponent
 * @prop {() => Message} AddHero
 * @prop {(name: string) => Message} ChangeHeroName
 * @prop {(id: number) => Message} DeleteHero
 * @prop {(name: string) => Message} NewHero
 * @prop {() => Message} ResetName
 * @prop {() => Message} ResetSearchResults
 * @prop {(data: State) => Message} SaveLocally
 * @prop {() => Message} SaveName
 * @prop {(value: string) => Message} Search
 * @prop {(id: number) => Message} ShowDetail
 * @prop {(data: State) => Message} UseFetchedHeroes
 */
