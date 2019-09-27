import { h, render, run } from '@composi/core'
import { Router } from '@composi/router'
import { Title } from './components/title'
import { Menu } from './components/menu'
import { getHeroes } from './effects/subscriptions'
import { App } from './components/app'
import { actions } from './effects/actions'
import { Msg } from './effects/messages'

render(<Title message='Tour of Heroes' />, 'header')
render(<Menu />, 'menu')


const program = {
  init() {
    return [null]
  },
  view(state, send) {
    return state && render(<App {...{ state, send }} />, 'section')
  },
  update(state, msg, send) {
    return actions(state, msg, send)
  },
  subscriptions(getState, send) {
    return getHeroes(getState, send)
  }
}

run(program)

// Setup router to track routes and send messages to update program:
const router = Router()
// Use destructuring to access the program's send function.
// This will let us send messages to the program when routes change.
const { send } = program
const { activeComponent, showDetail } = Msg
const showComponent = param => send(activeComponent(param))
const showHeroDetail = id => send(showDetail(id))

router(
  {
    path: '/heroes',
    action: () => showComponent('heroes')
  },
  {
    path: '/detail/:id',
    action: id => showHeroDetail(id)
  },
  {
    path: '*',
    action: () => showComponent('dashboard')
  }
)
