import { h, render, run } from '@composi/core'
import { clone } from '@composi/merge-objects'
import { startShow } from './subscription'
import { SlideShow } from './components/slideshow'
import { setupPics } from './utils'

// Define program:
const program = {
  init() {
    const state = {
      count: 1,
      pics: setupPics()
    }
    return [state]
  },
  view(state, send) {
    return render(<SlideShow {...{ state }} />, document.body)
  },
  update(state, msg) {
    const prevState = clone(state)
    if (msg.type === 'update-slide') {
      prevState.count = msg.data
    }
    return [prevState]
  },
  subscriptions(getState, send) {
    return startShow
  }
}

// Run slideshow:
run(program)
