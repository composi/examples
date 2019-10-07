import { h, render, run } from '@composi/core'
import { clone } from '@composi/merge-objects'
import { Title } from './components/title'
import { actions } from './actions'
import { Converter } from './components/converter'

// Render the page title:
render(<Title message='Composi Temperature Converter'/>,'header')


// Initial state for program:
const state = {
  celsius: 0,
  fahrenheit: 32,
  temperature: ''
}


// Define program:
const program = {
  init() {
    return [state]
  },
  view(state, send) {
    return render(<Converter {...{ state, send }} />, '.converter')
  },
  update(state, msg) {
    // Clone state:
    let prevState = clone(state)
    return actions(prevState, msg)
  }
}

// Run imported program:
run(program)
