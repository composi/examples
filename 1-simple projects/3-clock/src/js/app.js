import { h, render, run } from '@composi/core'
import { Title } from './components/title'
import { Clock } from './components/clock'


render(<Title message='Clock'/>, 'header')


/**
 * @typedef {import('@composi/core').Message} Message
 * @typedef {import('@composi/core').Send} Send
 * @typedef {() => State} GetState
 */
/**
 * @typedef {Object} State
 * @prop {Date} date
 * @prop {boolean} isDateVisible
 */
/**
 * Initial state for program.
 * @type{State}
 * */
const state = {
  date: new Date(),
  isDateVisible: true
}

/**
 * Effect to run as subscription to start clock ticking.
 * @param {GetState} getState
 * @param {Send} send
 */
function startClock(getState, send) {
  setInterval(() => send({ type: 'update-time' }), 1000)
}

/**
 * @param {State} state
 * @param {Message} msg
 * @param {Send} send
 */
function actions(state, msg, send) {
  const prevState = {...state}
  switch (msg.type) {
    case 'toggle-date':
      prevState.isDateVisible = !prevState.isDateVisible
      return prevState
    case 'update-time':
      prevState.date = new Date()
      return prevState
  }
}

// Define program to run:
/** @type {import('@composi/core').Program} */
const program = {
  init() {
    return state
  },
  /**
   * @param {State} state
   * @param {Send} send
   */
  view(state, send) {
    render(<Clock {...{ state, send }} />, '.container-fluid')
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
    return startClock(getState, send)
  }
}

// Run clock program:
run(program)
