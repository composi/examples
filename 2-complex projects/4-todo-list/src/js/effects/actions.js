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
 * @param {import('../types').State} prevState
 * @param {import('../types').Message} msg
 */
export function actions(prevState, msg) {
  return match(msg, {
    UpdateInputValue: value => {
      prevState.inputValue = value
      return prevState
    },
    AddItem: () => {
      if (prevState.inputValue) {
        prevState.items.push({
          active: true,
          value: prevState.inputValue,
          id: prevState.newKey++,
          hidden: false
        })
        prevState.inputValue = ''
        idb.set('todos', prevState)
      } else {
        alert('Please provide a value before submitting.')
      }
      return prevState
    },
    DeleteItem: id => {
      prevState.items = prevState.items.filter(item => item.id != id)
      idb.set('todos', prevState)
      return prevState
    },
    SetActiveState: id => {
      const index = prevState.items.findIndex(item => {
        return item.id == id
      })
      prevState.items[index].active = !prevState.items[index].active
      idb.set('todos', prevState)
      return prevState
    },
    ShowActive: () => {
      prevState.items.map(item => {
        if (!item.active) item.hidden = true
        else item.hidden = false
      })
      prevState.selectedButton = setButtonState(1)
      return prevState
    },
    ShowCompleted: () => {
      prevState.items.map(item => {
        if (item.active) item.hidden = true
        else item.hidden = false
      })
      prevState.selectedButton = setButtonState(2)
      return prevState
    },
    ShowAll: () => {
      prevState.items.map(item => item.hidden = false)
      prevState.selectedButton = setButtonState(0)
      return prevState
    },
    RenderLocalState: state => {
      return state
    }
  })
}
