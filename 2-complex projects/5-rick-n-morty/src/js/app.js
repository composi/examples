import {h, render, run} from '@composi/core'
import {App} from './components/app'
import {actions} from './effects/actions'
import {getCharacters} from './effects/subscriptions'



// Intial state for program:
const state = {
  dashboard: true
}


// Define program to run:
const program = {
  init() {
    return state
  },
  view(state, send) {
    return state.characters && render(<App {...{state, send}} />, 'section')
  },
  update(state, msg, send) {
    return actions(state, msg, send)
  },
  subscriptions(getState, send) {
    return getCharacters(getState, send)
  }
}

run(program)
