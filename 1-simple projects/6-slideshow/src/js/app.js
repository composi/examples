import { h, render, run } from '@composi/core'
import { clone } from '@composi/merge-objects'
import { startShow } from './subscription'
import { SlideShow } from './components/slideshow'
import { setupPics } from './utils'

// Define program:
const program = {
  init() {
    return {
      count: 1,
      pics: setupPics()
    }
  },
  view(state, send) {
    return render(<SlideShow {...{ state }} />, 'main')
  },
  update(state, msg, send) {
    const prevState = clone(state)
    if (msg.type === 'update-slide') {
      prevState.count = msg.data
    }
    return prevState
  },
  subscriptions(getState, send) {
    return startShow(getState, send)
  }
}

// Run slideshow:
run(program)
