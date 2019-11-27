import {h, render, run} from '@composi/core'
import {Title} from './components/title'
import {Movies} from './components/movie/movies'
import movieService from './services/movieService';

// Render title for app:
render(<Title message='Movie Cards' />, 'header')

/**
 * @typedef {import('./types').State} State
 * @typedef {import('./types').Send} Send
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').GetState} GetState
 */

/**
 * @type {import('./types').Program}
 */
const program = {
  init() {
    return {movies: []}
  },
  /**
   * @param {State} state
   * @param {Send} send
   */
  view(state, send) {
    if (!state || !state.length) return
    return render(<Movies {...{state, send}} />, '.container-fluid')
  },
  /**
   *
   * @param {State} state
   * @param {Message} msg
   * @param {Send} send
   */
  update(state, msg, send) {
    switch (msg.type) {
      case 'load-movies':
        return msg.data
    }
  },
  /**
   * @param {Send} send
   */
  subscriptions(send) {
    return movieService(send)
  }
}

// run movies program:
run(program)
