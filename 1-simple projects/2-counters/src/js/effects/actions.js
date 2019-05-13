import { Msg } from './messages'

// Define actions for update method:
export function actions(state, msg) {
  return Msg.match(msg, {
    AddCounter: () => {
      state.counters.push({
        number: 0,
        key: state.key++
      })
      return [state]
    },
    Increase: id => {
      const position = state.counters.findIndex(counter => id == counter.key)
      state.counters[position].number++
      state.sum++
      return [state]
    },
    Decrease: id => {
      const position = state.counters.findIndex(counter => id == counter.key)
      state.counters[position].number--
      state.sum--
      return [state]
    },
    Delete: id => {
      const counters = state.counters.filter(counter => id != counter.key)
      state.counters = counters
      state.sum = state.counters.reduce((a, b) => a + b.number, 0)
      return [state]
    }
  })
}
