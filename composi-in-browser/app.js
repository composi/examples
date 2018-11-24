import { h, render, run, union } from 'https://unpkg.com/@composi/core/dist/composi-core.mjs?module'
import htm from 'https://unpkg.com/htm/dist/htm.mjs?module'
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

const Msg = union(['AddItem', 'DeleteItem'])
function List({state, send}) {
  function setTarget(input) {
    ref.target = input
  }
  let inputValue
  function getInputValue(value) {
    inputValue = value
  }
  return html`
    <div class='container'>
      <p>
        <input autofocus onmount=${input => setTarget(input)} value=${state.resetInput} type='text' onchange=${e => getInputValue(e.target.value)}>
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
  resetInput: '',
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
function actions(msg, state) {
  const prevState = mergeObjects(state)
  return Msg.match(msg, {
    'AddItem': value => {
      if (!value) return [prevState]
      const key = prevState.newKey++
      prevState.fruits.push({key, value})
      ref.target.focus()
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
  update(msg, state) {
    return actions(msg, state)
  }
}

run(program)

