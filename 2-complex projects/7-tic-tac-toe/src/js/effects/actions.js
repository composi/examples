import {match} from './message'
import {handleSquareSelection} from './handleSquareSelection'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Message} Message
 * @typedef {import('../types').Send} Send
 */

/**
 * Define actions.
 * @param {State} state
 * @param {Message} msg
 * @param {Send} send
 */
export const actions = (state, msg, send) =>  match(msg, {
  SelectTile: tile => {
    const newState = handleSquareSelection(state, tile)
    return newState
  },
  JumpTo: jump => {
    state.stepNumber = jump
    state.xIsNext = (jump % 2) === 0
    return state
  },
  UseFetchedData: data => data
})
