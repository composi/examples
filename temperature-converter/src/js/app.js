import { h, render, run } from '@composi/core'
import { Title } from './components/title'
import { program } from './components/converter'

// Render the page title:
render(<Title message='Composi Temperature Converter'/>,'header')

// Run imported program:
run(program)