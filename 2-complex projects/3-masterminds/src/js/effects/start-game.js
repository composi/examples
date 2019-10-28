
import { guessEngine } from '../components/game';

// Effect for startup:
export function initGame() {
  guessEngine.startNewGame('EASY')
}

/**
 * @param {string | Symbol} difficulty
 */
export function startGame(difficulty) {
  guessEngine.startNewGame(difficulty)
}
