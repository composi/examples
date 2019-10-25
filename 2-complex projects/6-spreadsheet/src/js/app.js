import {h, render, run} from '@composi/core'
import {Title} from './components/title'
import { SpreadSheet } from './components/spreadsheet'
import { fruitData } from './data'
import { actions } from './effects/actions'

render(<Title message='@composi/core Spreadsheet'/>, 'header')


// Inital state for program:
const state = {
  inputValue: '',
  items: fruitData
}

// Define program to setup and run spreadsheet.
const program = {
  init() {
    return state
  },
  view(state, send) {
    return render(<SpreadSheet {...{ state, send }} />, '.list--spreadsheet')
  },
  update(state, msg) {
    return actions(state, msg)
  }
}

// Launch imported spreadsheet program.
run(program)
