import { h, render, run, union } from '@composi/core'
import { Title } from './components/title'
import { Counter } from './components/counter'
import { actions } from './effects/actions'

render(<Title message='Counters' />, 'header')


// Define initial state for program:
const state = {
  key: 102,
  sum: 1,
  counters: [
    {
      number: 1,
      key: 101
    }
  ]
}

// Define program:
const program = {
  init() {
    return [state]
  },
  update(state, msg) {
    return actions(state, msg)
  },
  view(state, send) {
    return render(<Counter {...{ state, send }} />, '.counters-container')
  }
}

// Run program:
run(program)
