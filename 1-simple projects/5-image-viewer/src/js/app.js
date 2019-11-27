import {h, render, run} from '@composi/core'
import {List} from './components/list'
import {createPopup} from './components/create-popup'
import {buildData} from './utils/build-data'
import {actions} from './effects/actions'

/**
 * @typedef {import('./types').State} State
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').Send} Send
 * @typedef {import('./types').GetState} GetState
 * @typedef {import('./types').Program} Program
 */
/**
 *
 * @param {{state: State, send: Send}} props
 */
function List2({state, send}) {
  console.log(state)
  return (
    <div id="app">
      <ul class='list'>
        <li>One</li>
        <li>Two</li>
      </ul>
    </div>
  )
}


/**
 * Create initial state for program.
 * @type {Program}
 */
const program = {
  init() {
    return buildData(10)
  },
  /**
   * @param {State} state
   * @param {Send} send
   */
  view(state, send) {
    return render(<List {...{state, send}} />, "#app")
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
   */
  subscriptions(send) {
    return createPopup(send)
  }
}

run(program)
