import { h } from '@composi/core'
import { Fragment } from '@composi/fragment'
import { Msg } from '../effects/messages'
const { Decrease, Increase, Delete } = Msg

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
