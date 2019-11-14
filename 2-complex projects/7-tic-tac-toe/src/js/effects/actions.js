import { Msg } from './message'
import { handleSquareSelection } from './handleSquareSelection'

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
export function actions(state, msg, send) {
  const prevState = {...state}
  /** @type {import('../types').MessageUnion} */
  return Msg.match(msg, {
    SelectTile: tile => {
      const newState = handleSquareSelection(prevState, tile)
      return newState
    },
    JumpTo: jump => {
      prevState.stepNumber = jump
      prevState.xIsNext = (jump % 2) === 0
      return prevState
    },
    UseFetchedData: data => data
  })
}
