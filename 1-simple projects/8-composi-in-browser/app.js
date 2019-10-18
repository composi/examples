// @ts-ignore
import { h, render, run, union } from 'https://unpkg.com/@composi/core@latest/dist/composi-core.mjs?module'
// @ts-ignore
import htm from 'https://unpkg.com/htm/dist/htm.mjs?module'
// @ts-ignore
import { clone } from 'https://unpkg.com/@composi/merge-objects/src/index.js?module'

const html = htm.bind(h)

function Title({msg}) {
  return html`
    <header>
      <nav>
        <h1>@composi/core: ${msg}!</h1>
      </nav>
    </header>
  `
}
render(html`<${Title} msg='In the Browser'/>`, 'header')

// Tagged union for program actions:
const Msg = union('updateInputValue', 'addItem', 'deleteItem')
const { updateInputValue, addItem, deleteItem } = Msg

// Functional list component for view:
function List({ state, send }) {
  function setFocus(input) {
    input.focus()
  }
  function animateIn(li) {
    li.classList.add('new-item')
  }
  function animateOut(li, done) {
    li.classList.add('remove-item')
    setTimeout(() => {
      done()
    }, 1000)
  }
  return html`
    <div class='container'>
      <p>
        <input autofocus onupdate=${setFocus} value=${state.inputValue} type='text' oninput=${e => send(updateInputValue(e.target.value))} />
        <button onclick=${() => send(addItem())} class='add-item'>Add</button>
      </p>
      <ul class='list'>
        ${
    state.items.map(fruit => html`<li
          key=${fruit.key}
          onmount=${animateIn}
          onunmount=${animateOut}
          >
            <span>${fruit.value}</span>
            <button class='delete-item' onclick=${() => send(deleteItem(fruit.key))}>X</button>
          </li>`)
    }
      </ul>
    </div>
  `
}

// State for program:
const state = {
  newKey: 104,
  inputValue: '',
  items: [
    {
      key: 101,
      value: 'Apples'
    },
    {
      key: 102,
      value: 'Oranges'
    },
    {
      key: 103,
      value: 'Bananas'
    }
  ]
}

// Define actions for program update method:
function actions(state, msg) {
  const prevState = clone(state)
  return Msg.match(msg, {
    // Update value as user types.
    updateInputValue: value => {
      prevState.inputValue = value
      return prevState
    },
    // Add new item to list:
    addItem: () => {
      if (prevState.inputValue) {
        prevState.items.push({
          key: prevState.newKey++,
          value: prevState.inputValue
        })
        prevState.inputValue = ''
      } else {
        alert('Please provide a value before submitting.')
      }
      return prevState
    },
    // Delete item based on its key:
    deleteItem: key => {
      prevState.items =  prevState.items.filter(fruit => fruit.key != key)
      return prevState
    }
  })
}

function handleEnterKey(getState, send) {
  document.addEventListener('keypress', e => {
    // Handle Enter key press:
    if (e.keyCode === 13) {
      send(addItem())
    }
  })
}

// Define runtime program
const program = {
  init() {
    return state
  },
  view(state, send) {
    return render(html`<${List} ...${{ state, send }} />`, '.container')
  },
  update(state, msg) {
    return actions(state, msg)
  },
  subscriptions(getState, send) {
    return handleEnterKey(getState, send)
  }
}

// Run program:
run(program)
