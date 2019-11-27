import {h} from '@composi/core'
import {calculateWinner} from '../effects/calculateWinner'
import {SelectTile, JumpTo} from '../effects/message'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 * @typedef {import('../types').Squares} Squares
 * @typedef {import('../types').Winner} Winner
 */
/**
 * Square component:
 * @param {{won: string, idx: number, value: string, send: Send}} props
 */
function Square({won, idx, value, send}) {
  return (
    <button class={`square ${won ? 'won' : ''}`} onclick={() => send(SelectTile(idx))}>
      {value}
    </button>
  )
}

/**
 * Board component:
 * @param {{squares: string[], winner: Winner, send: Send }} props
 */
function Board({squares, winner, send}) {
  function renderSquare(i) {
    let won
    if (winner) {
      var arr1 = winner.map(item => String(item))
      won = arr1.find((item) => item === String(i))
    }
    return (
      <Square
        value={squares[i]}
        idx={i}
        won={won}
        send={send}
      />
    )
  }
  return (
    <div>
      <div class="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div class="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div class="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}


/**
 * Define Game component:
 * @param {{state: State, send: Send}} props
 */
export function Game({state, send}) {
  // Keep track of choice to enable time travel:
  const history = state.history

  const current = (state.history[state.stepNumber])
  const winner = calculateWinner(current.squares)

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start'
    return (
      <li key={move}>
        <button class='button-moves' onclick={() => send(JumpTo(move))}>{desc}</button>
      </li>
    )
  })

  // Determine winner:
  let status
  if (winner) {
    status = "Winner: " + winner.who
  } else {
    status = "Next player: " + (state.xIsNext ? "X" : "O")
  }
  return (
    <div class="game">
      <div class="game-board">
        <Board
          squares={current.squares}
          winner={winner && winner.line}
          send={send}
        />
      </div>
      <div class="game-info">
        <div class={/Winner/img.test(status) ? 'winner' : ''}>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
