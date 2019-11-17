import { h, render, run } from '@composi/core'
import {Title} from './components/title'
import { Game } from './components/game'
import { actions } from './effects/actions'
import { initGame } from './effects/start-game'

// Set state on component.
// Will cause component to render.
render(<Title message='Masterminds'/>, 'header')

/**
 * @typedef {import('./types').State} State
 * @typedef {import('./types').Send} Send
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').GetState} GetState
 * @typedef {import('./types').Program} Program
 */

/**
 * Initial state for program
 * @type {State}
 */
const state = {
  guess: null,
  difficulty: 'EASY'
}

// Define program:
/**
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
    render(<Game {...{ state, send }} />, '.container')
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
   * @param {Send} send
   * @param {GetState} getState
   */
  subscriptions(send, getState) {
    return initGame()
  }
}


run(program)
