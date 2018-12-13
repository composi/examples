import {h, render, run} from '@composi/core'
import {Title} from './components/title'
import {program} from './components/spreadsheet'

render(<Title message='@composi/core Spreadsheet'/>, 'header')

run(program)