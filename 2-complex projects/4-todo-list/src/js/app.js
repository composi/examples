import { h, render, run, union } from '@composi/core'
import { clone } from '@composi/merge-objects'
import { batchedSubscriptions } from './effects/subscriptions'
import { TodoList } from './components/todo-list'
import { actions } from './effects/actions'




// Set up program.
const program = {
  init() {
    return [null]
  },
  view(state, send) {
    state && render(<TodoList {...{ state, send }} />, '.parent-view')
  },
  update(state, msg, send) {
    const prevState = clone(state)
    return actions(prevState, msg)
  },
  subscriptions(getState, send) {
    return batchedSubscriptions(getState, send)
  }
}

// Run the program:
run(program)
