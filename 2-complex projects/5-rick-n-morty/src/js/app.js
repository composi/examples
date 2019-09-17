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
    return [state]
  },
  view(state, send) {
    return render(<App {...{state, send}} />, 'section')
  },
  update(state, msg) {
    return actions(state, msg)
  },
  subscriptions(getState, send) {
    return getCharacters
  }
}

run(program)
