import { h } from '@composi/core'
import { CounterButtons } from './counter-button'
import { Msg } from '../effects/messages'
const { AddCounter } = Msg

// Counter component:
export function Counter({ state, send }) {
  return (
    <div class='counters-container'>
      <p>
        <button onclick={() => send(AddCounter())} id="addCounter">Add Counter</button>
      </p>
      <ul class="counter-list">
        {
          state.counters.map(counter => (
            <li class='counter' key={counter.key}>
              <CounterButtons {...{ counter, send }} />
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
