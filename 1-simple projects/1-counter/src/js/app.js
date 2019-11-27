import {h, render, run} from '@composi/core'
import {Title} from './components/title'

// Render title component:
render(<Title message='Counter' />, 'header')

/**
 * @typedef {import('@composi/core').Message} Message
 * @typedef {import('@composi/core').Send} Send
 * @typedef {Object} State
 * @prop {number} count
 */
/**
 * Define clicker as functional component.
 * @param {{state: State, send: Send}} props
 */
function Clicker({state, send}) {
  return (
    <div class="container">
      <div class="clicker border border-secondary rounded">
        <div class="clicker-display d-flex align-items-center bg-light text-secondary">
          <div class="mx-auto display-1">{state.count}</div>
        </div>
        <div class="clicker-button-panel d-flex flex-row">
          <button class="btn btn-success w-100" onclick={() => send({type: 'increment'})}>
            <i class="fa fa-plus fa-2x"></i>
          </button>
          <button class="btn btn-warning w-100" onclick={() => send({type: 'reset'})}>
            <i class="fa fa-refresh fa-2x"></i>
          </button>
          <button class="btn btn-danger w-100" onclick={() => send({type: 'decrement'})}>
            <i class="fa fa-minus fa-2x"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Actions for program update method.
 * @param {State} state
 * @param {Message} msg
 * @param {Send} send
 */
function actions(state, msg, send) {
  switch (msg.type) {
    case 'increment':
      state.count++
      return state
    case 'reset':
      state.count = 0
      return state
    case 'decrement':
      state.count--
      return state
  }
}

// Define program to run:
/**
 * @type {import('@composi/core').Program}
 */
const program = {
  init() {
    return {count: 0}
  },
  /**
   *
   * @param {State} state
   * @param {Send} send
   */
  view(state, send) {
    return render(<Clicker {...{state, send}} />, '.container')
  },
  /**
   * @param {State} state
   * @param {Message} msg
   * @param {Send} send
   */
  update(state, msg, send) {
    const prevState = {...state}
    return actions(prevState, msg, send)
  }
}

// Run program:
run(program)
