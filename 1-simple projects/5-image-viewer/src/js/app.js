import { h, render, run } from '@composi/core'
import { clone } from '@composi/merge-objects'
import { List } from './components/list'
import { createPopup } from './components/create-popup'
import { buildData } from './utils/build-data'
import { actions } from './effects/actions'
import { popup, popupImage } from './components/create-popup'


function List2({ state, send }) {
  console.log(state)
  return (
    <div id="app">
      <ul class='list'>
        <li>One</li>
        <li>Two</li>
      </ul>
    </div>
  )
}


// Create initial state for program:
const program = {
  init() {
    return buildData(10)
  },
  view(state, send) {
    return render(<List {...{state, send}} />, "#app")
  },
  update(state, msg) {
    // Clone state:
    let prevState = clone(state)
    return actions(prevState, msg)
  },
  subscriptions(getState, send) {
    return createPopup(getState, send)
  }
}

run(program)
