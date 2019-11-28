import {startGame} from './start-game'
import {guessEngine} from '../components/game';
import {DifficultyLevel} from '../lib/GuessEngine';


/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Message} Message
 * @typedef {import('../types').Send} Send
 */
/**
 * @param {State} state
 * @param {Message} msg
 * @param {Send} send
 */
export function actions(state, msg, send) {

  switch (msg.type) {
    case 'EASY':
      startGame(DifficultyLevel.EASY)
      state.outcome = ''
      state.guess = 0
      return state
    case 'MEDIUM':
      startGame(DifficultyLevel.MEDIUM)
      state.outcome = ''
      state.guess = 0
      return state
    case 'HARD':
      startGame(DifficultyLevel.HARD)
      state.outcome = ''
      state.guess = 0
      return state
    case 'number-change':
      const guess = msg.data.target.value;
      if (!isNaN(guess)) {
        state.guess = parseInt(guess)
      }
      return state
    case 'guess-number':
      const guessOutcome = guessEngine.guess(state.guess);

      if (guessOutcome.accuracy === 0) {
        state.outcome = 'you win'
      } else {
        const outcome = `${guessOutcome.getIndicator()} : ${guessOutcome.getSuggestion()}`;
        const indicator = guessOutcome.getIndicator();
        state.outcome = outcome
        state.indicator = indicator
      }
      return state
    case 'play-again':
      startGame('EASY')
      return state
  }
}
