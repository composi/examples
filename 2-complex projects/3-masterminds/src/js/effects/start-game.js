
import { guessEngine } from '../components/game';

// Effect for startup:
export function initGame() {
  guessEngine.startNewGame('EASY')
}
export function startGame(difficulty) {
  guessEngine.startNewGame(difficulty)
}
