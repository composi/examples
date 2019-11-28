import {h, render, run} from '@composi/core'
import {clone} from '@composi/clone'
import {subs} from './effects/subscriptions'
import {TodoList} from './components/todo-list'
import {actions} from './effects/actions'

/**
 * @typedef {import('./types').State} State
 * @typedef {import('./types').Send} Send
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').GetState} GetState
 * @typedef {import('./types').Program} Program
 */


//
/**
 * Set up program.
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
    state && render(<TodoList {...{state, send}} />, '.parent-view')
  },
  /**
   * @param {State} state
   * @param {Message} msg
   * @param {Send} send
   */
  update(state, msg, send) {
    /** @type {State} */
    const prevState = clone(state)
    return actions(prevState, msg)
  },
  /**
   * @param {GetState} getState
   * @param {Send} send
   */
  subscriptions(send, getState) {
    return subs(send, getState)
  }
}

// Run the program:
run(program)
