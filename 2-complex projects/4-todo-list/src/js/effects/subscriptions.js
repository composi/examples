import { Msg } from './messages'
import { idb } from '@composi/idb'
import { batch } from '@composi/core'

const { AddItem, RenderLocalState } = Msg


/**
 * @typedef {import('../types').Send} Send
 */

/**
 * @param {Send} send
 */
function handleEnterKey(send) {
  document.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
      send(AddItem())
    }
  })
}


// Default state:
/** @type {import('../types').State} */
const initialState = {
  newKey: 104,
  items: [
    { active: true, value: 'Take a nap', id: 101, hidden: false },
    { active: false, value: 'Eat a snack', id: 102, hidden: false },
    { active: true, value: 'Talk with Mom', id: 103, hidden: false }
  ],
  selectedButton: [true, false, false],
  inputValue: ''
}

/**
 * @param {Send} send
 */
function getData(send) {
  (async () => {
    const todos = await idb.get('todos')
    if (todos) {
      send(RenderLocalState(todos))
    } else {
      send(RenderLocalState(initialState))
    }
  })()
}

export const subs = batch(handleEnterKey, getData)
