import {calculateWinner} from './calculateWinner'

/**
 * Function to handle tile selection.
 * @param {import('../types').State} state
 * @param {number} idx
 */
export function handleSquareSelection(state, idx) {
  const history = state.history.slice(0, state.stepNumber + 1)
  const current = history[history.length - 1]
  const squares = current.squares.slice()
  if (calculateWinner(squares) || squares[idx]) {
    return
  }
  squares[idx] = state.xIsNext ? "X" : "O"
  state.history = history.concat([{squares: squares}])
  state.stepNumber = history.length,
    state.xIsNext = !state.xIsNext
  return state
}
