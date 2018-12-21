// @ts-ignore
import { h, render, run, union } from 'https://unpkg.com/@composi/core/dist/composi-core.mjs?module'
// @ts-ignore
import htm from 'https://unpkg.com/htm/dist/htm.mjs?module'
// @ts-ignore
import { mergeObjects } from 'https://unpkg.com/@composi/merge-objects/src/index.js?module'

const html = htm.bind(h)

function Title({greeting}) {
  return html`
    <nav>
      <h1>Hello, ${greeting}!</h1>
    </nav>
  `
}
render(html`<${Title} greeting='Everyone'/>`, 'header')


const ref = {
  target: undefined
}

const Msg = union(['UpdateInputValue', 'AddItem', 'DeleteItem'])
function List({ state, send }) {
  function setFocus(input) {
    input.focus()
  }
  return html`
    <div class='container'>
      <p>
        <input autofocus onupdate=${setFocus} value=${state.inputValue} type='text' oninput=${e => send(Msg.UpdateInputValue(e.target.value))} />
        <button onclick=${() => send(Msg.AddItem(inputValue))} class='add-item'>Add</button>
      </p>
      <ul class='list'>
        ${
          state.fruits.map(fruit => html`<li key=${fruit.key}>
            <span>${fruit.value}</span>
            <button class='delete-item' onclick=${() => send(Msg.DeleteItem(fruit.key))}>X</button>
          </li>`)
        }
      </ul>
    </div>
  `
}

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
function actions(state, msg) {
  const prevState = mergeObjects(state)
  return Msg.match(msg, {
    'UpdateInputValue': value => {
      prevState.inputValue = value
      return [prevState]
    },
    'AddItem': () => {
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
    'DeleteItem': key => {
      const filteredFruits = prevState.fruits.filter(fruit => fruit.key != key)
      prevState.fruits = filteredFruits
      return [prevState]
    }
  })
}
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
  subscriptions(state, send) {
    return () => {
      document.addEventListener('keypress', e => {
        if (e.keyCode == 13) {
          send(Msg.AddItem())
        }
      })
    }
  }
}

run(program)

