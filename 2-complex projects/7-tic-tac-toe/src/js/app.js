import { h, render, run } from '@composi/core'
import { Title } from './components/title'
import { Game } from './components/game'
import { fetchJsonData } from './effects/fetchJsonData'
import { actions } from './effects/actions'

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
    return state && render(<Game {...{ state, send }} />, '.game')
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
    return fetchJsonData(getState, send)
  }
}

// Run the program:
run(program)
