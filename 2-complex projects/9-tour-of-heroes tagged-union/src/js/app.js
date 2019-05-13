import { h, render, run } from '@composi/core'
import { clone } from '@composi/merge-objects'
import { Router } from '@composi/router'
import { Title } from './components/title'
import { Menu } from './components/menu'
import { getHeroes } from './effects/subscriptions'
import { App } from './components/app'
import { actions } from './effects/actions'
import { Msg } from './effects/messages'

const { activeComponent, showDetail } = Msg

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
      program.send(activeComponent('dashboard'))
    }
  },
  {
    path: '/dashboard',
    action: () => {
      program.send(activeComponent('dashboard'))
    }
  },
  {
    path: '/heroes',
    action: () => {
      program.send(activeComponent('heroes'))
    }
  },
  {
    path: '/detail/:id',
    action: (id) => {
      program.send(showDetail(parseInt(id)))
    }
  }])
