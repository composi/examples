import { h } from '@composi/core'
import { ListItem } from './list-item'
import { Footer } from './footer'
import { Msg } from '../effects/messages'
const { UpdateInputValue, AddItem } = Msg

// Define todo list.
export function TodoList({ state, send }) {
  let value
  function focusInput(input) {
    input.focus()
  }
  return (
    <div class="parent-view">
      <p class="add-todo">
        <input value={state.inputValue} type="text" onmount={el => focusInput(el)} oninput={e => send(UpdateInputValue(e.target.value))} value={state.inputValue} />
        <button class='addItem' onclick={() => send(AddItem(value))}>Add Item</button>
      </p>
      <ul class='todo-list'>
        {
          state.items.map(item => (
            <ListItem {...{ item, send }} />
          ))
        }
      </ul>
      <Footer {...{ state, send }} />
    </div>
  )
}
