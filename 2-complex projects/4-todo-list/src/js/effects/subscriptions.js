import { Msg } from './messages'
import { idb } from '@composi/idb'
import { batchEffects } from '@composi/core'
import { id } from './id'

const { AddItem, RenderLocalState } = Msg


function handleEnterKey(getState, send) {
  document.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
      send(AddItem())
    }
  })
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

function getData(getState, send) {
  (async () => {
    const todos = await idb.get('todos')
    if (todos) {
      send(RenderLocalState(todos))
    } else {
      send(RenderLocalState(initialState))
    }
  })()
}

export const batchedSubscriptions = batchEffects(handleEnterKey, getData)
