import { h } from '@composi/core'
import { CounterButtons } from './counter-buttons'
import { Msg } from '../effects/messages'
const { AddCounter } = Msg

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Message} Message
 * @typedef {import('../types').Send} Send
 */

/**
 * ounter component.
 * @param {{state: State, send: Send}} props
 */
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
