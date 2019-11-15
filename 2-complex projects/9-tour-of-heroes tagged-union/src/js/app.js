import { h, render, run } from '@composi/core'
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
 * @typedef {import('./types').Send} Send
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').GetState} GetState
 */

/** @type {import('./types').Program} */
const program = {
  init() {
    return null
  },
  /**
   * @param {State} state
   * @param {Send} send
   */
  view(state, send) {
    return state && render(<App {...{ state, send }} />, '.app-root')
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
   * @param {GetState} getState
   * @param {Send} send
   */
  subscriptions(getState, send) {
    return getHeroes(getState, send)
  }
}

run(program)

setupRoutes(program)