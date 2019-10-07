import { h, render, run } from '@composi/core'
import { clone } from '@composi/merge-objects'
import { Title } from './components/title'

// Render title component:
render(<Title message='Counter' />, 'header')

// Define clicker as functional component.
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

// Actions for program update method:
function actions(state, msg) {
  switch (msg.type) {
    case 'increment':
      state.count++
      return [state]
    case 'reset':
      state.count = 0
      return [state]
    case 'decrement':
      state.count--
      return [state]
  }
}

// Define program to run:
/**
 * @type {import('@composi/core').Program}
 */
const program = {
  init() {
    return [{count: 0}]
  },
  view(state, send) {
    return render(<Clicker {...{state, send}}/>, '.container')
  },
  update(state, msg) {
    const prevState = clone(state)
    return actions(prevState, msg)
  }
}

// Run program:
run(program)
