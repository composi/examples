import { Msg } from './messages'
import { clone } from '@composi/merge-objects'

// Define actions for update method:
export function actions(state, msg) {
  const prevState = clone(state)
  return Msg.match(msg, {
    AddCounter: () => {
      prevState.counters.push({
        number: 0,
        key: prevState.key++
      })
      return prevState
    },
    Increase: id => {
      const position = prevState.counters.findIndex(counter => id == counter.key)
      prevState.counters[position].number++
      prevState.sum++
      return prevState
    },
    Decrease: id => {
      const position = prevState.counters.findIndex(counter => id == counter.key)
      prevState.counters[position].number--
      prevState.sum--
      return prevState
    },
    Delete: id => {
      const counters = prevState.counters.filter(counter => id != counter.key)
      prevState.counters = counters
      prevState.sum = prevState.counters.reduce((a, b) => a + b.number, 0)
      return prevState
    }
  })
}
