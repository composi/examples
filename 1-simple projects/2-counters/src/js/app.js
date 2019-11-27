import {h, render, run, union} from '@composi/core'
import {Title} from './components/title'
import {Counter} from './components/counter'
import {actions} from './effects/actions'

render(<Title message='Counters' />, 'header')

/**
 * @typedef {import('./types').State} State
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').Send} Send
 */

/**
 * Define initial state for program.
 * @type {State}
 */
const state = {
  key: 102,
  sum: 1,
  counters: [
    {
      number: 1,
      key: 101
    }
  ]
}

// Define program:
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
    return render(<Counter {...{state, send}} />, '.counters-container')
  },
  /**
   * @param {State} state
   * @param {Message} msg
   * @param {Send} send
   */
  update(state, msg, send) {
    return actions(state, msg, send)
  }
}

// Run program:
run(program)
