import { h, render, run } from '@composi/core'
import {Title} from './components/title'
import {TabContainer} from './components/tab-container'
import {actions} from './action'


/**
 * @typedef {import('./types').State} State
 * @typedef {import('./types').Send} Send
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').GetState} GetState
 * @typedef {import('./types').Program} Program
 */

// Render title component:
render(<Title message='Tab Example' />, 'header')

/** @type {State} */
const state = {
  activeId: "one",
  tabs: [
    {
      id: "one", label: "First Tab", description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, beatae.'
    },
    {
      id: "two", label: "Second Tab", description: 'Veritatis repellendus corrupti labore quo vero nesciunt sunt modi incidunt!'
    },
    {
      id: "three", label: "Third Tab", description: 'Tempore fuga alias possimus ut, quos autem maiores consectetur debitis.'
    },
    {
      id: "four", label: "Fourth Tab", description: 'Amet inventore iste quasi, dignissimos enim, perferendis tenetur nostrum officiis ipsam neque voluptatem dolorum a adipisci voluptates laborum voluptas dolorem! Rem, in?'
    }
  ]
}


/** @type {Program} */
const program = {
  init() {
    return state
  },
  /**
   * @param {State} state
   * @param {Send} send
   */
  view(state, send) {
    return render(<TabContainer {...{ state, send }} />, ".tab-list")
  },
  /**
   * @param {State} state
   * @param {Message} msg
   * @param {Send} send
   */
  update(state, msg, send) {
    return actions(state, msg, send)
  }
}

run(program)
