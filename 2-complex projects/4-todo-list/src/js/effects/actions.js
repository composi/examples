import {idb} from '@composi/idb'
import {match} from './messages'

/**
 * Set state of footer bottons to show tasks.
 * @param {number} index
 */
const setButtonState = index => {
  const buttons = [false, false, false]
  buttons[index] = true
  return buttons
}

/**
 * Actions for program's update method.
 * @param {import('../types').State} state
 * @param {import('../types').Message} msg
 * @param {import('../types').Send} send
 */
export const actions = (state, msg, send) => match(msg, {
  UpdateInputValue: value => {
    state.inputValue = value
    return state
  },
  AddItem: () => {
    if (state.inputValue) {
      state.items.push({
        active: true,
        value: state.inputValue,
        id: state.newKey++,
        hidden: false
      })
      state.inputValue = ''
      idb.set('todos', state)
    } else {
      alert('Please provide a value before submitting.')
    }
    return state
  },
  DeleteItem: id => {
    state.items = state.items.filter(item => item.id != id)
    idb.set('todos', state)
    return state
  },
  SetActiveState: id => {
    const index = state.items.findIndex(item => item.id === id)
    state.items[index].active = !state.items[index].active
    idb.set('todos', state)
    return state
  },
  ShowActive: () => {
    state.items.map(item => !item.active ? item.hidden = true : item.hidden = false)
    state.selectedButton = setButtonState(1)
    return state
  },
  ShowCompleted: () => {
    state.items.map(item => item.active ? item.hidden = true : item.hidden = false)
    state.selectedButton = setButtonState(2)
    return state
  },
  ShowAll: () => {
    state.items.map(item => item.hidden = false)
    state.selectedButton = setButtonState(0)
    return state
  },
  RenderLocalState: state => {
    return state
  }
})
