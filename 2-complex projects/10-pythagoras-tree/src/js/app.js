import { h, render, run, union } from '@composi/core'
import { clone } from '@composi/merge-objects'
import { Tree } from './components/tree'
import { handleMouseMove } from './effects/subscription'


// Set up initial state for program.
const state = {
  currentMax: 10,
  baseW: 80,
  heightFactor: 0,
  lean: 0,
  firstRender: false
}

// Get reference to component container.
const section = document.querySelector('section')

// Define program to run animated fractal.
const program = {
  init() {
    return [state]
  },
  view(state, send) {
    return render(<Tree SVG_HEIGHT={0} {...{state, send}} />, section, 'img')
  },
  update(state, msg, send) {
    const prevState = clone(state)
    if (msg.type === 'update-tree') {
      prevState.heightFactor = msg.data.heightFactor
      prevState.lean = msg.data.lean
      return [prevState]
    }
  },
  subscriptions(getState, send) {
    // Run subscription to track cursor movement:
    return handleMouseMove(getState, send)
  }
}

run(program)
