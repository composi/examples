import {h, render, run} from '@composi/core'
import {Title} from './components/title'
import {SpreadSheet} from './components/spreadsheet'
import {fruitData} from './data'
import {actions} from './effects/actions'

render(<Title message='@composi/core Spreadsheet' />, 'header')

/**
 * @typedef {import('./types').State} State
 * @typedef {import('./types').Send} Send
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').GetState} GetState
 * @typedef {import('./types').Program} Program
 */

/**
 * Inital state for program:
 * @type {State}
 */
const state = {
  inputValue: '',
  items: fruitData
}

/**
 * Define program to setup and run spreadsheet.
 * @typedef {Program}
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
    return render(<SpreadSheet {...{state, send}} />, '.list--spreadsheet')
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

// Launch imported spreadsheet program.
run(program)
