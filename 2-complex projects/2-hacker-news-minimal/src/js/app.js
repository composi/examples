import {h, render, run} from '@composi/core'
import {clone} from '@composi/clone'
import {HackerNews} from './components/hacker-news'
import {loadItems} from './effects/load-items'
import {actions} from './effects/actions'

/**
 * @typedef {import('./types').State} State
 * @typedef {import('./types').Send} Send
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').GetState} GetState
 */

/**
 * @type {State}
 */
const state = {
  lastUpdate: new Date(),
  items: []
}

// Define program to run.
// Init will run effect "loadItems" to fetch data from HackerNews.
/** @type {import('./types').Program} */
const program = {
  init() {
    return state
  },
  /**
   * @param {State} state
   * @param {Send} send
   */
  view(state, send) {
    return render(<HackerNews {...{state, send}} />, '#app')
  },
  /**
   * @param {State} state
   * @param {Message} msg
   * @param {Send} send
   */
  update(state, msg, send) {
    /** @type {State} */
    const prevState = clone(state)
    return actions(prevState, msg, send)
  },
  /**
   * @param {GetState} GetState
   * @param {Send} send
   */
  subscriptions(send) {
    return loadItems(send)
  }
}

run(program)
