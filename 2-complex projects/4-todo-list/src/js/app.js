import { h, render, run, union } from '@composi/core'
import { batchedSubscriptions } from './effects/subscriptions'
import { TodoList } from './components/todo-list'
import { actions } from './effects/actions'

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
    state && render(<TodoList {...{ state, send }} />, '.parent-view')
  },
  /**
   * @param {State} state
   * @param {Message} msg
   * @param {Send} send
   */
  update(state, msg, send) {
    const prevState = {...state}
    return actions(prevState, msg)
  },
  /**
   * @param {GetState} getState
   * @param {Send} send
   */
  subscriptions(getState, send) {
    return batchedSubscriptions(getState, send)
  }
}

// Run the program:
run(program)
