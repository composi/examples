import { h, render, run } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'
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
          <button class="btn btn-success w-100" onclick={() => send({type: 'increment-count'})}>
            <i class="fa fa-plus fa-2x"></i>
          </button>
          <button class="btn btn-warning w-100" onclick={() => send({type: 'reset-count'})}>
            <i class="fa fa-refresh fa-2x"></i>
          </button>
          <button class="btn btn-danger w-100" onclick={() => send({type: 'decrement-count'})}>
            <i class="fa fa-minus fa-2x"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

// Define program to run:
const program = {
  init() {
    return [{count: 0}]
  },
  view(state, send) {
    return render(<Clicker {...{state, send}}/>, 'section')
  },
  update(state, msg) {
    const prevState = mergeObjects(state)
    switch (msg.type) {
      case 'increment-count':
        prevState.count++
        return [prevState]
      case 'reset-count':
        prevState.count = 0
        return [prevState]
      case 'decrement-count':
        prevState.count--
        return [prevState]
    }
  }
}

// Run program:
run(program)
