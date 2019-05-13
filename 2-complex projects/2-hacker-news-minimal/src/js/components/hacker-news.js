import { h } from '@composi/core'
import Navigation from './navigation'
import { Item } from './item'

// Main functional component.
export function HackerNews({ state, send }) {
  const lastUpdate = state.lastUpdate

  if (state.items && state.items.length) {
    return (
      <div id="app">
        <Navigation {...{ lastUpdate, send }} />
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
