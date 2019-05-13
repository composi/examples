import { h, render, run } from '@composi/core'
import { clone } from '@composi/merge-objects'
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

export const program = {
  init() {
    return [state]
  },
  view(state, send) {
    return render(<App {...{ state, send }} />, 'section')
  },
  update(state, msg, send) {
    let prevState = clone(state)
    return actions(prevState, msg, send)
  },
  subscriptions() {
    return getHeroes
  }
}

run(program)

const router = Router()

router([
  {
    path: "/",
    action: () => {
      program.send({ type: 'active-component', data: 'dashboard' })
    }
  },
  {
    path: '/dashboard',
    action: () => {
      program.send({ type: 'active-component', data: 'dashboard' })
    }
  },
  {
    path: '/heroes',
    action: () => {
      program.send({ type: 'active-component', data: 'heroes' })
    }
  }
  ,
  {
    path: '/detail/:id',
    action: (id) => {
      program.send({ type: 'show-detail', data: parseInt(id) })
    }
  }])
