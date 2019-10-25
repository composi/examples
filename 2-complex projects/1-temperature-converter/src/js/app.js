import { h, render, run } from '@composi/core'
import { Title } from './components/title'
import { actions } from './actions'
import { Converter } from './components/converter'

/**
 * @typedef {import('@composi/core').Message} Message
 * @typedef {import('@composi/core').Send} Send
 * @typedef {import('@composi/core').Program} Program
 * @typedef {import('./types').State} State
 */

// Render the page title:
render(<Title message='Composi Temperature Converter'/>,'header')


/**
 * Initial state for program.
 * @type {State}
 */
const state = {
  celsius: '0',
  fahrenheit: '32',
  temperature: ''
}



/**
 * Define program.
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
    return render(<Converter {...{ state, send }} />, '.converter')
  },
  /**
   * @param {State} state
   * @param {Message} msg}
   * @param {Send} send
   */
  update(state, msg, send) {
    return actions(state, msg, send)
  }
}

// Run imported program:
run(program)
