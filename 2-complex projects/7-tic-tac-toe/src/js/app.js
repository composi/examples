import {h, render, run} from '@composi/core'
import {clone} from '@composi/clone'
import {Title} from './components/title'
import {Game} from './components/game'
import {fetchJsonData} from './effects/fetchJsonData'
import {actions} from './effects/actions'

/**
 * @typedef {import('./types').State} State
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').Send} Send
 * @typedef {import('./types').Program} Program
 * @typedef {import('./types').GetState} GetState
 */

// Render title component:
render(<Title message='Tic-tac-toe' />, 'header')


/**
 * Define program to run.
 * @type {Program}
 */
const program = {
  init() {
    return null
  },
  /**
   * @param {State} state
   * @param {Send} send
   */
  view(state, send) {
    return state && render(<Game {...{state, send}} />, '.game')
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
 * @param {Send} send
 */
  subscriptions(send) {
    return fetchJsonData(send)
  }
}

// Run the program:
run(program)
