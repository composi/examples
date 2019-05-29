import { h, render, run } from '@composi/core'
import { clone } from '@composi/merge-objects'
import { Title } from './components/title'
import { Clock } from './components/clock'


render(<Title message='Clock'/>, 'header')


// Initial state for program:
const state = {
  date: new Date(),
  isDateVisible: true
}

// Effect to run as subscription to start clock ticking:
function startClock(getState, send) {
  setInterval(() => send({ type: 'update-time' }), 1000)
}

function actions(prevState, msg) {
  switch (msg.type) {
    case 'toggle-date':
      prevState.isDateVisible = !prevState.isDateVisible
      return [prevState]
    case 'update-time':
      prevState.date = new Date()
      return [prevState]
  }
}

// Define program to run:
const program = {
  init() {
    return [state]
  },
  view(state, send) {
    render(<Clock {...{ state, send }} />, 'section')
  },
  update(state, msg) {
    const prevState = clone(state)
    return actions(prevState, msg)
  },
  subscriptions(getState, send) {
    return startClock(getState, send)
  }
}

// Run clock program:
run(program)
