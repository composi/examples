import { h } from '@composi/core'
import { ListItem } from './list-item'
import { Footer } from './footer'
import { Msg } from '../effects/messages'
import { setFocus } from '../effects/visual-effecs'
const { UpdateInputValue, AddItem } = Msg


// Define todo list.
export function TodoList({ state, send }) {
  let value
  return (
    <div class="parent-view">
      <p class="add-todo">
        <input value={state.inputValue} type="text" onupdate={setFocus} oninput={e => send(UpdateInputValue(e.target.value))}/>
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
