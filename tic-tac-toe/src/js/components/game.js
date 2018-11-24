import { h, render, union } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'

// Function to handle tile selection:
function handleSquareSelection(state, idx) {
  const history = state.history.slice(0, state.stepNumber + 1)
  const current = history[history.length - 1]
  const squares = current.squares.slice()
  if (calculateWinner(squares) || squares[idx]) {
    return
  }
  squares[idx] = state.xIsNext ? "X" : "O"
  state.history = history.concat([{ squares: squares }])
  state.stepNumber = history.length,
    state.xIsNext = !state.xIsNext
  return state
}

// Square component:
function Square(props) {
  return (
    <button class={`square ${props.won ? 'won' : ''}`} onclick={props.onClick}>
      {props.value}
    </button>
  )
}

// Board component:
function Board(props) {
  function renderSquare(i) {
    let won
    if (props.winner) {
      var arr1 = props.winner.map(item => String(item))
      won = arr1.find((item) => item === String(i))
    }
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.send(Msg.SelectTile(i))}
        won={won}
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

// Calculate the winner:
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

      return {
        who: squares[a],
        line: lines[i]
      }
    }
  }
  return null
}

// Initial state for game:
const state = {
  history: [
    {
      squares: Array(9).fill(null)
    }
  ],
  stepNumber: 0,
  xIsNext: true
}

// Define Game component:
function Game({ state, send }) {
  const history = state.history
  const current = state.history[state.stepNumber]
  const winner = calculateWinner(current.squares)

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start'
    return (
      <li key={move}>
        <button class='button-moves' onclick={() => send(Msg.JumpTo(move))}>{desc}</button>
      </li>
    )
  })

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
          onClick={i => this.handleClick(i)}
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

// Define union:
const Msg = union(['SelectTile', 'JumpTo'])

// Define actions:
function actions(msg, prevState) {
  return Msg.match(msg, {
    'SelectTile': tile => {
      prevState = handleSquareSelection(prevState, tile)
      return [prevState]
    },
    'JumpTo': jump => {
      prevState.stepNumber = jump
      prevState.xIsNext = (jump % 2) === 0
      return [prevState]
    }
  })
}

// Define program to run
export const program = {
  init() {
    return [state]
  },
  view(state, send) {
    return render(<Game {...{ state, send }} />, 'section')
  },
  update(msg, state) {
    let prevState = mergeObjects(state)
    return actions(msg, prevState)
  }
}
