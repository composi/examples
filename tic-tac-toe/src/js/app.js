import { h, render, run } from '@composi/core'
import { Title } from './components/title'
import { program } from './components/game'

// Render title component:
render(<Title message='Tic-tac-toe' />, 'header')


run(program)