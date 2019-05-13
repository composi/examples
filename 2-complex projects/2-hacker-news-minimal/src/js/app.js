import { h, render, run } from '@composi/core'
import { clone } from '@composi/merge-objects'
import { HackerNews } from './components/hacker-news'
import { loadItems } from './effects/load-items'
import { actions } from './effects/actions'

const state = {
  lastUpdate: new Date(),
  items: []
}

// Define program to run.
// Init will run effect "loadItems" to fetch data from HackerNews.
const program = {
  init() {
    return [state]
  },
  view(state, send) {
    return render(<HackerNews {...{ state, send }} />, 'section')
  },
  update(state, msg, send) {
    const prevState = clone(state)
    return actions(prevState, msg, send)
  },
  subscriptions() {
    return loadItems
  }
}

run(program)
