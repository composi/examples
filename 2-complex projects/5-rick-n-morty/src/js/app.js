import { h, render, run } from '@composi/core'
import { clone } from '@composi/merge-objects'
import { App } from './components/app'
import { actions } from './effects/actions'
import { getCharacters } from './effects/subscriptions'



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
    return render(<App {...{ state, send }} />, 'section')
  },
  update(state, msg) {
    // Clone state:
    let prevState = clone(state)
    return actions(prevState, msg)
  },
  subscriptions(getState, send) {
    return getCharacters
  }
}

run(program)
