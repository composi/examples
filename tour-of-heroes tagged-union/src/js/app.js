import { h, render, run } from '@composi/core'
import { Router } from '@composi/router'
import { Title } from './components/title'
import { Menu } from './components/menu'
import { program } from './components/app'
import { Msg } from './utils/tagged-union'


render(<Title message='Tour of Heroes' />, 'header')
render(<Menu />, 'menu')

run(program)

const router = Router()

router([
  {
    path: "/",
    action: () => {
      program.send(Msg.ActivateComponent('dashboard'))
    }
  },
  {
    path: '/dashboard',
    action: () => {
      program.send(Msg.ActivateComponent('dashboard'))
    }
  },
  {
    path: '/heroes',
    action: () => {
      program.send(Msg.ActivateComponent('heroes'))
    }
  }
  ,
  {
    path: '/detail/:id',
    action: (id) => {
      program.send(Msg.ShowDetail(parseInt(id)))
    }
  }])