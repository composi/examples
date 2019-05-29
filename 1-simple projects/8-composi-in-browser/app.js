// @ts-ignore
import { h, render, run, union } from 'https://unpkg.com/@composi/core/dist/composi-core.mjs?module'
// @ts-ignore
import htm from 'https://unpkg.com/htm/dist/htm.mjs?module'
// @ts-ignore
import { clone } from 'https://unpkg.com/@composi/merge-objects/src/index.js?module'

const html = htm.bind(h)

function Title({msg}) {
  return html`
    <nav>
      <h1>@composi/core: ${msg}!</h1>
    </nav>
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
    state.fruits.map(fruit => html`<li
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
  fruits: [
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
    'updateInputValue': value => {
      prevState.inputValue = value
      return [prevState]
    },
    // Add new item to list:
    'addItem': () => {
      if (!prevState.inputValue) {
        alert('Please provide a value before submitting.')
        return
      }
      prevState.fruits.push({
        key: prevState.newKey++,
        value: prevState.inputValue
      })
      prevState.inputValue = ''
      return [prevState]
    },
    // Delete item based on its key:
    'deleteItem': key => {
      const filteredFruits = prevState.fruits.filter(fruit => fruit.key != key)
      prevState.fruits = filteredFruits
      return [prevState]
    }
  })
}

// Define runtime program
const program = {
  init() {
    return [state]
  },
  view(state, send) {
    render(html`<${List} ...${{state, send}} />`, 'section')
  },
  update(state, msg) {
    return actions(state, msg)
  },
  subscriptions(getState, send) {
    return () => {
      document.addEventListener('keypress', e => {
        // Handle Enter key press:
        if (e.keyCode == 13) {
          send(addItem())
        }
      })
    }
  }
}

// Run program:
run(program)
