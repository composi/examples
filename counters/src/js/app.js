import { h, render, run, union } from '@composi/core'
import { Title } from './components/title'
import { Fragment } from '@composi/fragment'

render(<Title message='Counters' />, 'header')

function CounterButtons({ counter, send }) {
  return (
    <Fragment>
      <button disabled={counter.number < 1} onclick={() => send(Msg.Decrease(counter.key))} id="decrease">-</button>
      <span>{counter.number}</span>
      <button onclick={() => send(Msg.Increase(counter.key))} id="increase">+</button>
      <button onclick={() => send(Msg.Delete(counter.key))}>Delete</button>
    </Fragment>
  )
}

function Counter({state, send}) {
  return (
    <div class='counters-container'>
      <p>
        <button onclick={() => send(Msg.AddCounter())} id="addCounter">Add Counter</button>
      </p>
      <ul class="counter-list">
        {
          state.counters.map(counter => (
            <li class='counter' key={counter.key}>
              <CounterButtons {...{counter, send}} />
            </li>
          ))
        }
      </ul>
      <p id='sum'>
        <span>The sum of all counters is: </span>
        <strong>{state.sum}</strong>
      </p>
    </div>
  )
}

// Create tagged union for actions:
const Msg = union(['AddCounter', 'Increase', 'Decrease', 'Delete'])

// Define actions for update method:
function actions(msg, state) {
  return Msg.match(msg, {
    'AddCounter': () => {
      state.counters.push({
        number: 0,
        key: state.key++
      })
      return [state]
    },
    'Increase': id => {
      const position = state.counters.findIndex(counter => id == counter.key)
      state.counters[position].number++
      state.sum++
      return [state]
    },
    'Decrease': id => {
      const position = state.counters.findIndex(counter => id == counter.key)
      state.counters[position].number--
      state.sum--
      return [state]
    },
    'Delete': id => {
      const counters = state.counters.filter(counter => id != counter.key)
      state.counters = counters
      state.sum = state.counters.reduce((a, b) => a + b.number, 0)
      return [state]
    }
  })
}

// Define initial state for program:
const state = {
  key: 102,
  sum: 1,
  counters: [
    {
      number: 1,
      key: 101
    }
  ]
}

// Define program:
const program = {
  init() {
    return [state]
  },
  update(msg, state) {
    return actions(msg, state)
  },
  view(state, send) {
    return render(<Counter {...{state, send}} />, 'section')
  }
}

// Run program:
run(program)

