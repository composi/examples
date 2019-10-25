import {h, render, run} from '@composi/core'
import {App} from './components/app'
import {actions} from './effects/actions'
import {subs} from './effects/subscriptions'

/**
 * @typedef {import('./types').State} State
 * @typedef {import('./types').Send} Send
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').GetState} GetState
 * @typedef {import('./types').Program} Program
 */

/**
 * Intial state for program.
 * @type {State}
 */
const state = {
  inputValue: '',
  dashboard: true
}


/**
 * Define program to run.
 * @type {Program}
*/
const program = {
  init() {
    return state
  },
  /**
   * @param {State} state
   * @param {Send} send
   */
  view(state, send) {
    return state.characters && render(<App {...{state, send}} />, 'section')
  },
  /**
   * @param {State} state
   * @param {Message} msg
   * @param {Send} send
   */
  update(state, msg, send) {
    return actions(state, msg, send)
  },
  /**
   * @param {GetState} getState
   * @param {Send} send
   */
  subscriptions(getState, send) {
    return subs(getState, send)
  }
}

run(program)
