import { h, render, run } from '@composi/core'
import { Title } from './components/title'
import { program } from './components/movie/movies'

// Render title for app:
render(<Title message='Movie Cards'/>, 'header')

// run movies program:
run(program)