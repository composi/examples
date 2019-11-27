import {h} from '@composi/core'
import {ListItem} from './list-item'
import {Footer} from './footer'
import {Msg, UpdateInputValue, AddItem} from '../effects/messages'
import {setFocus} from '../effects/visual-effecs'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 */
/**
 * Define todo list.
 * @param {{state: State, send: Send}} props
 */
export function TodoList({state, send}) {
  return (
    <div class="parent-view">
      <p class="add-todo">
        <input value={state.inputValue} type="text" onupdate={setFocus} oninput={e => send(UpdateInputValue(e.target.value))} />
        <button class='addItem' onclick={() => send(AddItem())}>Add Item</button>
      </p>
      <ul class='todo-list'>
        {
          state.items.map(item => (
            <ListItem {...{item, send}} />
          ))
        }
      </ul>
      <Footer {...{state, send}} />
    </div>
  )
}
