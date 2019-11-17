import { h, render, run } from '@composi/core'
import { Router } from '@composi/router'
import { Title } from './components/title'
import { Menu } from './components/menu'
import { getHeroes } from './effects/subscriptions'
import { App } from './components/app'
import { actions } from './effects/actions'
import {setupRoutes} from './routes'


render(<Title message='Tour of Heroes' />, 'header')
render(<Menu />, 'menu')

/**
 * @typedef {import('./types').State} State
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').Send} Send
 * @typedef {import('./types').Program} Program
 * @typedef {import('./types').GetState} GetState
 */

/** @type {State} */
const state = {
  activeComponent: 'dashboard',
  heroes: [],
  selectedHero: null,
  searchResults: [],
  newId: 21,
  newHero: '',
  inputValue: ''
}

/**
 * @type {Program}
 */
export const program = {
  init() {
    return state
  },
  /**
   * @param {State} state
   * @param {Send} send
   */
  view(state, send) {
    return render(<App {...{ state, send }} />, '.app-root')
  },
  /**
   * @param {State} state
   * @param {Message} msg
   * @param {Send} send
   */
  update(state, msg, send) {
    return actions(state, msg, send)
  },
  /**
   * @param {Send} send
   */
  subscriptions(send) {
    return getHeroes(send)
  }
}

run(program)

setupRoutes(program)