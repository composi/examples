import { idb } from '@composi/idb'
import { Msg } from './messages'
import { id } from './id'

// Set state of footer bottons to show tasks.
const setButtonState = index => {
  const buttons = [false, false, false]
  buttons[index] = true
  return buttons
}

// Actions for program's update method:
export function actions(prevState, msg) {
  return Msg.match(msg, {
    UpdateInputValue: value => {
      prevState.inputValue = value
      return prevState
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
        return prevState
      } else {
        alert('Please provide a value before submitting.')
      }
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
  }, (msg) => {
    console.log(`There was no match. We received: ${msg}`)
  })
}
