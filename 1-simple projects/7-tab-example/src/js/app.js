import { h, render, run, union, batchEffects } from '@composi/core'
import { clone } from '@composi/merge-objects'
import {Title} from './components/title'
import {TabContainer} from './components/tab-container'
import {actions} from './action'

// Render title component:
render(<Title message='Tab Example' />, 'header')


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




const program = {
  init() {
    return state
  },
  view(state, send) {
    return render(<TabContainer {...{ state, send }} />, ".tab-list")
  },
  update(state, msg, send) {
    return actions(state, msg)
  },
  subscriptions(getState, send) {

  }
}

run(program)
