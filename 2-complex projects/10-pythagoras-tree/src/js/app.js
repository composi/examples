import { h, render, run, union } from '@composi/core'
import { Tree } from './components/tree'
import { handleMouseMove } from './effects/subscription'

/**
 * @typedef {import('./types').State} State
 * @typedef {import('./types').Send} Send
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').GetState} GetState
 * @typedef {import('./types').Program} Program
 */

/**
 * Set up initial state for program.
 * @type {State}
 */
const state = {
  currentMax: 10,
  baseW: 80,
  heightFactor: 0,
  lean: 0,
  firstRender: false
}

// Get reference to component container.
const section = document.querySelector('section')

/**
 * Define program to run animated fractal.
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
    let SVG_HEIGHT = 0
    return render(<Tree {...{ state, send, SVG_HEIGHT }} />, '#svg-base')
  },
  /**
   * @param {State} state
   * @param {Message} msg
   * @param {Send} send
   */
  update(state, msg, send) {
    const prevState = {...state}
    if (msg.type === 'update-tree') {
      prevState.heightFactor = msg.data.heightFactor
      prevState.lean = msg.data.lean
      return prevState
    }
  },
  /**
   * @param {GetState} getState
   * @param {Send} send
   */
  subscriptions(getState, send) {
    // Run subscription to track cursor movement:
    return handleMouseMove(getState, send)
  }
}

run(program)
