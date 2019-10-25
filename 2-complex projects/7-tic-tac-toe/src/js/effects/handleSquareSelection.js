import { calculateWinner } from './calculateWinner'

/**
 * unction to handle tile selection.
 * @param {import('../types').State} state
 * @param {number} idx
 */
export function handleSquareSelection(state, idx) {
  // console.log('state.history:')
  // console.log(state.history)
  const history = state.history.slice(0, state.stepNumber + 1)
  const current = history[history.length - 1]
  // console.log('current')
  // console.log(current)
  const squares = current.squares.slice()
  console.log('the square are:')
  console.log(squares)
  if (calculateWinner(squares) || squares[idx]) {
    return
  }
  squares[idx] = state.xIsNext ? "X" : "O"
  state.history = history.concat([{ squares: squares }])
  state.stepNumber = history.length,
    state.xIsNext = !state.xIsNext
  return state
}
