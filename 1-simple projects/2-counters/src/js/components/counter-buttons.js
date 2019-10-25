import { h, Fragment } from '@composi/core'
import { Msg } from '../effects/messages'
const { Decrease, Increase, Delete } = Msg

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Message} Message
 * @typedef {import('../types').Send} Send
 * @typedef {import('../types').Counter} Counter
 */

/**
 * @param {{ counter: Counter, send: Send }} props
 */
export function CounterButtons({ counter, send }) {
  return (
    <Fragment>
      <button disabled={counter.number < 1} onclick={() => send(Decrease(counter.key))} id="decrease">-</button>
      <span>{counter.number}</span>
      <button onclick={() => send(Increase(counter.key))} id="increase">+</button>
      <button onclick={() => send(Delete(counter.key))}>Delete</button>
    </Fragment>
  )
}
