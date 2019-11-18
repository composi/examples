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
 * @prop {string} NewHero
 * @prop {number} detail
 * @prop {Hero[]} searchResults
 */

/**
 * @typedef {Object} ActionMethods
 * @prop {(data: State) => State} UseFetchedHeroes
 * @prop {(activeComponent: string) => State} ActiveComponent
 * @prop {(id: number) => State} ShowDetail
 * @prop {(id: number) => State} DeleteHero
 * @prop {(name: string) => State} ChangeHeroName
 * @prop {() => State} ResetName
 * @prop {() => State} SaveName
 * @prop {(name: string) => State} NewHero
 * @prop {() => State} AddHero
 * @prop {(data: State) => State} SaveLocally
 * @prop {(value: string) => State} Search
 */

/**
 * @typedef {Object} MessageUnion
 * @prop {(msg: Message, Object: ActionMethods) => State} match
 * @prop {(data: State) => Message} UseFetchedHeroes
 * @prop {(activeComponent: string) => Message} ActiveComponent
 * @prop {(id: number) => Message} ShowDetail
 * @prop {(id: number) => Message} DeleteHero
 * @prop {(name: string) => Message} ChangeHeroName
 * @prop {() => Message} ResetName
 * @prop {() => Message} SaveName
 * @prop {(name: string) => Message} NewHero
 * @prop {() => Message} AddHero
 * @prop {(data: State) => Message} SaveLocally
 * @prop {(value: string) => Message} Search
 */