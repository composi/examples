import { h } from '@composi/core'

import { Msg } from '../effects/messages'
const { ShowAll, ShowActive, ShowCompleted } = Msg

// Footer Component:
export function Footer({ state, send }) {
  let count = 0
  state.items.forEach(item => {
    if (item.active === true) {
      count += 1
    }
  })
  return (
    <footer>
      <div id="totals-view"><span>{count} left.</span></div>
      <p>Show: </p>
      <div id="show-todo-state">
        <button onclick={e => send(ShowAll(e))} id="show-all" class={state.selectedButton[0] ? 'selected' : ''}>All</button>
        <button onclick={() => send(ShowActive())} id="show-active" class={state.selectedButton[1] ? 'selected' : ''}>Active</button>
        <button onclick={e => send(ShowCompleted(e))} id="show-completed" class={state.selectedButton[2] ? 'selected' : ''}>Completed</button>
      </div>
    </footer>
  )
}
