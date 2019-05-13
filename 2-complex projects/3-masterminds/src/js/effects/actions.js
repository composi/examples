import { startGame } from './start-game'
import { clone } from '@composi/merge-objects'
import { guessEngine } from '../components/game';
import { DifficultyLevel } from '../lib/GuessEngine';

export function actions(state, msg, send) {

  const prevState = clone(state)
  switch (msg.type) {
    case 'EASY':
      startGame(DifficultyLevel.EASY)
      prevState.outcome = ''
      prevState.guess = 0
      return [prevState]
    case 'MEDIUM':
      startGame(DifficultyLevel.MEDIUM)
      prevState.outcome = ''
      prevState.guess = 0
      return [prevState]
    case 'HARD':
      startGame(DifficultyLevel.HARD)
      prevState.outcome = ''
      prevState.guess = 0
      return [prevState]
    case 'number-change':
      const guess = msg.data.target.value;
      if (!isNaN(guess)) {
        prevState.guess = parseInt(guess)
      }
      return [prevState]
    case 'guess-number':
      const guessOutcome = guessEngine.guess(state.guess);

      if (guessOutcome.accuracy === 0) {
        prevState.outcome = 'you win'
      } else {
        const outcome = `${guessOutcome.getIndicator()} : ${guessOutcome.getSuggestion()}`;
        const indicator = guessOutcome.getIndicator();
        prevState.outcome = outcome
        prevState.indicator = indicator
      }
      return [prevState]
    case 'play-again':
      startGame('EASY')
      return [prevState]
  }
}