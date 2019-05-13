import { h, render, run } from '@composi/core'
import { Title } from './components/title'
import { Game } from './components/game'
import { fetchJsonData } from './effects/fetchJsonData'
import { actions } from './effects/actions'

// Render title component:
render(<Title message='Tic-tac-toe' />, 'header')


// Define program to run:
const program = {
  init() {
    return [null]
  },
  view(state, send) {
    return state && render(<Game {...{ state, send }} />, 'section')
  },
  update(state, msg, send) {
    return actions(state, msg, send)
  },
  subscriptions(state, send) {
    return fetchJsonData
  }
}

// Run the program:
run(program)
