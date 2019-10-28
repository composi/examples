import { h } from '@composi/core'
import Navigation from './navigation'
import { Item } from './item'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 */
/**
 * Main functional component.
 * @param {{state: State, send: Send}} props
 */
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
