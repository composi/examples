import { h, render, run } from '@composi/core'
import {Title} from './components/title'
import { Game } from './components/game'
import { actions } from './effects/actions'
import { initGame } from './effects/start-game'

// Set state on component.
// Will cause component to render.
render(<Title message='Masterminds'/>, 'header')


// Initial state for program
const state = {
  guess: null,
  difficulty: 'EASY'
}

// Define program:
const program = {
  init() {
    return state
  },
  view(state, send) {
    render(<Game {...{ state, send }} />, '.container')
  },
  update(state, msg, send) {
    return actions(state, msg, send)
  },
  subscriptions(state, send) {
    return initGame()
  }
}


run(program)
