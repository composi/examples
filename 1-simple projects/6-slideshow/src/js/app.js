import {h, render, run} from '@composi/core'
import {clone} from '@composi/clone'
import {startShow} from './subscription'
import {SlideShow} from './components/slideshow'
import {setupPics} from './utils'

/**
 * @typedef {import('./types').State} State
 * @typedef {import('./types').Program} Program
 * @typedef {import('./types').Send} Send
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').GetState} GetState
 */
/** @type {State} */
const state = {
  count: 1,
  pics: setupPics()
}
// Define program:
const program = {
  init() {
    return state
  },
  /**
   * @param {State} state
   * @param {Send} send
   */
  view(state, send) {
    return render(<SlideShow {...{state}} />, 'main')
  },
  /**
   * @param {State} state
   * @param {Message} msg
   * @param {Send} send
   */
  update(state, msg, send) {
    const prevState = clone(state)
    if (msg.type === 'update-slide') {
      prevState.count = msg.data
    }
    return prevState
  },
  /**
   * @param {Send} send
   */
  subscriptions(send) {
    return startShow(send)
  }
}

// Run slideshow:
run(program)
