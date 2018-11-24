import {h, render, run} from '@composi/core'
import Navigation from './components/navigation'
import Item from './components/item'

const API_ORIGIN = 'https://hacker-news.firebaseio.com'

const asJson = r => r.json()

const state = {
  lastUpdate: new Date(),
  items: []
}

// Effect to fetch data during program init:
function loadItems() {
  fetch(`${API_ORIGIN}/v0/topstories.json`).then(asJson)
    .then(items => Promise.all(items.slice(0, 19).map(
      item => fetch(`${API_ORIGIN}/v0/item/${item}.json`).then(asJson)
    )))
    // Send fetched data to update action:
    .then(items => program.send({ type: 'load', data: items }))
}

// Action to sort posts:
function sortByScore(state) {
  let items = state.items
  items.sort((a, b) => b.score - a.score)
  return state.items = items
}

// Main functional component.
function HackerNews({ state, send }) {
  const lastUpdate = state.lastUpdate

  if (state.items && state.items.length) {
    return (
      <div id="app">
        <Navigation {...{ lastUpdate, send}}/>
        <ul>
          {
            state.items && state.items.length && state.items.map(item => <Item item={item} />)
          }
        </ul>
      </div>
    )
  } else {
    // No data during initial load,
    // so use this as template.
    return (
      <div id="app">
        <Navigation {...{ lastUpdate, send }} />
        <ul></ul>
      </div>
    )
  }
}

// Define program to run.
// Init will run effect "loadItems" to fetch data from HackerNews.
const program = {
  init() {
    return [state, loadItems]
  },
  view(state, send) {
    return render(<HackerNews {...{ state, send }} />, 'section')
  },
  // Three actions.
  // 'load' handles effect from init.
  // 'sort' sorts posts.
  // 'reload' will reload data after sort.
  // 'reload will also cause lastUpdate to update.
  update(msg, state) {
    switch(msg.type) {
      case 'load':
        state.items = msg.data
        return [state]
      case 'sort':
        const sorted = sortByScore(state)
        state.items = sorted
        return [state]
      case 'reload':
        loadItems()
        state.lastUpdate = new Date()
        return [state]
    }
  }
}

run(program)
