export function noop() {}


/**
 * @typedef {import('@composi/core').Message} Message
 * @typedef {import('@composi/core').Send} Send
 * @typedef {import('@composi/core').Program} Program
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
 * @prop {number} detail
 * @prop {Hero[]} searchResults
 */

/**
 * @typedef {Object} ActionMethods
 * @prop {(data: State) => State} useFetchedHeroes
 * @prop {(activeComponent: string) => State} activeComponent
 * @prop {(id: number) => State} showDetail
 * @prop {(id: number) => State} deleteHero
 * @prop {(name: string) => State} changeHeroName
 * @prop {() => State} resetName
 * @prop {() => State} saveName
 * @prop {(name: string) => State} newHero
 * @prop {() => State} addHero
 * @prop {(data: State) => State} saveLocally
 * @prop {(value: string) => State} search
 */

/**
 * @typedef {Object} MessageUnion
 * @prop {(msg: Message, Object: ActionMethods) => State} match
 * @prop {(data: State) => Message} useFetchedHeroes
 * @prop {(activeComponent: string) => Message} activeComponent
 * @prop {(id: number) => Message} showDetail
 * @prop {(id: number) => Message} deleteHero
 * @prop {(name: string) => Message} changeHeroName
 * @prop {() => Message} resetName
 * @prop {() => Message} saveName
 * @prop {(name: string) => Message} newHero
 * @prop {() => Message} addHero
 * @prop {(data: State) => Message} saveLocally
 * @prop {(value: string) => Message} search
 */