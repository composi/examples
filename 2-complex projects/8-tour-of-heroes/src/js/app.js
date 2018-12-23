import { h, render, run } from '@composi/core'
import { Router } from '@composi/router'
import { Title } from './components/title'
import { Menu } from './components/menu'
import { program } from './components/program'


render(<Title message='Tour of Heroes' />, 'header')
render(<Menu />, 'menu')

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