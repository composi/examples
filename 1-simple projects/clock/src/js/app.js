import { h, render, run } from '@composi/core'
import { Title } from './components/title'
import { program } from './components/clock'


render(<Title message='Clock'/>, 'header')


// Run clock program:
run(program)
