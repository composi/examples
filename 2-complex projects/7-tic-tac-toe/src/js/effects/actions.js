import { clone } from '@composi/merge-objects'
import { Msg } from './message'
import { handleSquareSelection } from './handleSquareSelection'


// Define actions:
export function actions(state, msg) {
  const prevState = clone(state)
  return Msg.match(msg, {
    selectTile: tile => {
      const newState = handleSquareSelection(prevState, tile)
      return [newState]
    },
    jumpTo: jump => {
      prevState.stepNumber = jump
      prevState.xIsNext = (jump % 2) === 0
      return [prevState]
    },
    useFetchedData: data => [data]
  })
}
