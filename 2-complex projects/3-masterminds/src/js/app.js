import { h, render, run } from '@composi/core'
import {Title} from './components/title'
import { program } from './components/game'

// Set state on component.
// Will cause component to render.
render(<Title message='Masterminds'/>, 'header')

run(program)
