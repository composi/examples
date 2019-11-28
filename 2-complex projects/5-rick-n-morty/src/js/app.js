import {h, render, run} from '@composi/core'
import {clone} from '@composi/clone'
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
    /** @type {State} */
    const prevState = clone(state)
    return actions(prevState, msg, send)
  },
  /**
   * @param {GetState} getState
   * @param {Send} send
   */
  subscriptions(send, getState) {
    return subs(send, getState)
  }
}

run(program)
