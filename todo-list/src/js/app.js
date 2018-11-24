import { h, render, run, union } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'
import { idb } from '@composi/idb'


// id for list items
function id() {
  return Math.floor(Math.random() * 100000000 + Math.random() * 1000)
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
function ListItem({ item, animateIn, animateOut, send }) {
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
  function updateValue(e) {
    value = e.target.value
    e.target.focus()
  }
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
    <div class="parent-view">
      <p class="add-todo">
        <input type="text" onmount={el => focusInput(el)} onchange={updateValue} value={state.inputValue} />
        <button class='addItem' onclick={() => send(Msg.AddItem(value))}>Add Item</button>
      </p>
      <ul class='todo-list'>
        {
          state.items.map(item => (
            <ListItem {...{ item, animateIn, animateOut, send}} />
          ))
        }
      </ul>
      <Footer {...{ state, setButtonState, send}} />
    </div>
  )
}

// Default state:
const state = {
  newKey: 104,
  items: [
    { active: true, value: 'Take a nap', id: id(), hidden: false },
    { active: false, value: 'Eat a snack', id: id(), hidden: false },
    { active: true, value: 'Talk with Mom', id: id(), hidden: false }
  ],
  selectedButton: [true, false, false],
  inputValue: ''
}

// Create a tagged union.
const Msg = union(['AddItem', 'DeleteItem', 'SetActiveState', 'ShowActive', 'ShowCompleted', 'ShowAll'])

const one = () => console.log('Hello')
const two = () => console.log('World')
const three = () => {
  let count = 0
  const id = setInterval(() => {
    if (count > 4) {
      clearInterval(id)
    } else {
      count++
      console.log(`The count is ${count}`)
    }
  }, 1000)
}


// Set up program.
const program = {
  init() {
    return [state]
  },
  view(state, send) {
    render(<TodoList {...{state, send}} />, 'section')
  },
  update(msg, state) {
    return Msg.match(msg, {
      'AddItem': value => {
        if (value) {
          const prevState = mergeObjects(state)
          prevState.items.push({ active: true, value, id: id(), hidden: false })
          idb.set('todos', prevState)
          return [prevState]
        }
      },
      'DeleteItem': id => {
        state.items = state.items.filter(item => item.id != id)
        idb.set('todos', state)
        return [state]
      },
      'SetActiveState': id => {
        const index = state.items.findIndex(item => {
          return item.id == id
        })
        state.items[index].active = !state.items[index].active
        idb.set('todos', state)
        return [state]
      },
      'ShowActive': () => {
        state.items.map(item => {
          if (!item.active) item.hidden = true
          else item.hidden = false
        })
        state.selectedButton = setButtonState(1)
        return [state]
      },
      'ShowCompleted': () => {
       state.items.map(item => {
         if (item.active) item.hidden = true
         else item.hidden = false
       })
        state.selectedButton = setButtonState(2)
        return [state]
      },
      'ShowAll': () => {
        state.items.map(item => item.hidden = false)
        state.selectedButton = setButtonState(0)
        return [state]
      }
    })
  }
}

window.program = program


// See if there are any todos stored in IndexedDB.
// If so, use it as first value of program.init.
idb.get('todos')
  .then(todos => {
    if (todos) {
      // Reassign program init with new data.
      program.init = () => [todos]
    }
  })
  // Run the program.
  .then(() => {
    run(program)
  })




