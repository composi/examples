import { h, render, run, union } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'
import { idb } from '@composi/idb'


// id for list items
function id() {
  return Math.floor(Math.random() * 100000000 + Math.random() * 1000)
}

// Default state:
const initialState = {
  newKey: 104,
  items: [
    { active: true, value: 'Take a nap', id: id(), hidden: false },
    { active: false, value: 'Eat a snack', id: id(), hidden: false },
    { active: true, value: 'Talk with Mom', id: id(), hidden: false }
  ],
  selectedButton: [true, false, false],
  inputValue: ''
}

// Set state of footer bottons to show tasks.
const setButtonState = index => {
  const buttons = [false, false, false]
  buttons[index] = true
  return buttons
}

// Footer Component:
function Footer({ state, setButtonState, send}) {
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
        <button onclick={e => send(Msg.ShowAll(e))} id="show-all" class={state.selectedButton[0] ? 'selected' : ''}>All</button>
        <button onclick={() => send(Msg.ShowActive())} id="show-active" class={state.selectedButton[1] ? 'selected' : ''}>Active</button>
        <button onclick={e => send(Msg.ShowCompleted(e))} id="show-completed" class={state.selectedButton[2] ? 'selected' : ''}>Completed</button>
      </div>
    </footer>
  )
}

// List Item Component:
function ListItem({ item, send }) {
  function animateIn(el) {
    el.classList.add('add-item')
  }
  function animateOut(done, el) {
    el.classList.add('delete-item')
    setTimeout(() => {
      done()
    }, 1000)
  }
  return (
    <li key={item.id} class={item.active ? 'active' : ''} hidden={item.hidden} onmount={animateIn} onunmount={animateOut}>
      <button class='set-state' onclick={() => send(Msg.SetActiveState(item.id))}>
        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="selection-indicator"><path d="M2,13 L9.9294326,16.8406135 L17.1937075,1.90173332" id="checkmark" stroke="#007AFF" stroke-width="2"></path></g></g></svg>
      </button>
      <h3 onclick={() => send(Msg.SetActiveState(item.id))}>{item.value}</h3>
      <button onclick={() => send(Msg.DeleteItem(item.id))} class="delete">
        <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Delete" stroke="#FF0000" stroke-width="2" stroke-linecap="square"><path d="M26.5,3.5 L3.5,26.5" id="Line"></path><path d="M3.5,3.5 L26.5,26.5" id="Line"></path></g></g></svg>
      </button>
    </li>
  )
}

// Define todo list.
function TodoList({ state, send }) {
  let value
  function focusInput(input) {
    input.focus()
  }
  return (
    <div class="parent-view">
      <p class="add-todo">
        <input value={state.inputValue} type="text" onmount={el => focusInput(el)} oninput={e => send(Msg.UpdateInputValue(e.target.value))} value={state.inputValue} />
        <button class='addItem' onclick={() => send(Msg.AddItem(value))}>Add Item</button>
      </p>
      <ul class='todo-list'>
        {
          state.items.map(item => (
            <ListItem {...{ item, send}} />
          ))
        }
      </ul>
      <Footer {...{ state, setButtonState, send}} />
    </div>
  )
}

// Create a tagged union.
const Msg = union(['UpdateInputValue', 'AddItem', 'DeleteItem', 'SetActiveState', 'ShowActive', 'ShowCompleted', 'ShowAll', 'RenderLocalState'])

// Actions for program's update method:
function actions(prevState, msg) {
  return Msg.match(msg, {
    UpdateInputValue: value => {
      prevState.inputValue = value
      return [prevState]
    },
    AddItem: () => {
      if (prevState.inputValue) {
        prevState.items.push({
          active: true,
          value: prevState.inputValue,
          id: id(),
          hidden: false
        })
        prevState.inputValue = ''
        idb.set('todos', prevState)
        return [prevState]
      } else {
        alert('Please provide a value before submitting.')
      }
    },
    DeleteItem: id => {
      prevState.items = prevState.items.filter(item => item.id != id)
      idb.set('todos', prevState)
      return [prevState]
    },
    SetActiveState: id => {
      const index = prevState.items.findIndex(item => {
        return item.id == id
      })
      prevState.items[index].active = !prevState.items[index].active
      idb.set('todos', prevState)
      return [prevState]
    },
    ShowActive: () => {
      prevState.items.map(item => {
        if (!item.active) item.hidden = true
        else item.hidden = false
      })
      prevState.selectedButton = setButtonState(1)
      return [prevState]
    },
    ShowCompleted: () => {
      prevState.items.map(item => {
        if (item.active) item.hidden = true
        else item.hidden = false
      })
      prevState.selectedButton = setButtonState(2)
      return [prevState]
    },
    ShowAll: () => {
      prevState.items.map(item => item.hidden = false)
      prevState.selectedButton = setButtonState(0)
      return [prevState]
    },
    RenderLocalState: state => {
      return [state]
    }
  }, (msg) => {
    console.log(`There was no match. We received: ${msg}`)
  })
}

// Set up program.
const program = {
  init() {
    return [null]
  },
  view(state, send) {
    state && render(<TodoList {...{state, send}} />, 'section')
  },
  update(state, msg) {
    const prevState = mergeObjects(state)
    return actions(prevState, msg)
  },
  subscriptions(state, send) {
    return () => {
      document.addEventListener('keypress', e => {
        if (e.keyCode === 13) {
          send(Msg.AddItem())
        }
      })
      // Use async function to query IndexedDB:
      async function getLocalData() {
        const todos = await idb.get('todos')
        if (todos) {
          send(Msg.RenderLocalState(todos))
        } else {
          send(Msg.RenderLocalState(initialState))
        }
      }
      getLocalData()
    }
  }
}

// Run the program:
run(program)
