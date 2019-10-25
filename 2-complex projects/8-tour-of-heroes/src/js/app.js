import { h, render, run } from '@composi/core'
import { Router } from '@composi/router'
import { Title } from './components/title'
import { Menu } from './components/menu'
import { getHeroes } from './effects/subscriptions'
import { App } from './components/app'
import { actions } from './effects/actions'


render(<Title message='Tour of Heroes' />, 'header')
render(<Menu />, 'menu')


const state = {
  activeComponent: 'dashboard',
  heroes: [],
  selectedHero: '',
  searchResults: [],
  newId: 21,
  newHero: '',
  inputValue: ''
}

/**
 * @type {import('./types').Program}
 */
export const program = {
  init() {
    return state
  },
  view(state, send) {
    return render(<App {...{ state, send }} />, '.app-root')
  },
  update(state, msg, send) {
    return actions(state, msg, send)
  },
  subscriptions(getState, send) {
    return getHeroes(getState, send)
  }
}

run(program)

const router = Router()

// Capture the program's send function so we can
// dispatch messages to it from the routes:
const { send } = program

router(
  {
    path: "/",
    action: () => send({ type: 'active-component', data: 'dashboard' })
  },
  {
    path: '/dashboard',
    action: () => send({ type: 'active-component', data: 'dashboard' })
  },
  {
    path: '/heroes',
    action: () => send({ type: 'active-component', data: 'heroes' })
  }
  ,
  {
    path: '/detail/:id',
    action: id => send({ type: 'show-detail', data: id })
  }
)
