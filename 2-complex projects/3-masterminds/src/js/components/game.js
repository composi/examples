import { h, render, run } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'
import { DifficultyLevel, GuessEngine } from '../lib/GuessEngine';

const guessEngine = new GuessEngine();

function outcomeClass(state) {
  const indicator = state.indicator;

  if (!indicator || indicator === '') {
    return '';
  }

  if (indicator === 'boiling') {
    return 'indicator--red fa fa-thermometer-0 fa-2x';
  }

  if (indicator === 'hot') {
    return 'indicator--orange fa fa-thermometer-0 fa-2x';
  }

  if (indicator === 'warm') {
    return 'indicator--yellow fa fa-thermometer-0 fa-2x';
  }

  if (indicator === 'cold') {
    return 'indicator--green fa fa-thermometer-0 fa-2x';
  }

  if (indicator === 'frosty') {
    return 'indicator--cyan fa fa-thermometer-0 fa-2x';
  }

  return 'indicator--blue fa fa-thermometer-0 fa-2x';
}

function startGame(difficulty) {
  guessEngine.startNewGame(difficulty)
}

function Game({state, send}) {
  function activeLinkClass(difficultyLevel) {
    return guessEngine.difficultyLevel === difficultyLevel ? 'active' : '';
  }
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-4 mx-auto">
          {
            state.outcome !== 'you win' && <div>
              <div class="form-group">
                <ul class="nav nav-pills nav-fill">
                  <li class="nav-item">
                    <a class={`nav-link ${activeLinkClass(DifficultyLevel.EASY)}`}
                      onclick={() => send({type: 'EASY'})}>EASY</a>
                  </li>
                  <li class="nav-item">
                    <a class={`nav-link ${activeLinkClass(DifficultyLevel.MEDIUM)}`}
                      onclick={() => send({ type: 'MEDIUM' })}>MEDIUM</a>
                  </li>
                  <li class="nav-item">
                    <a class={`nav-link ${activeLinkClass(DifficultyLevel.HARD)}`}
                      onclick={() => send({ type: 'HARD' })}>HARD</a>
                  </li>
                </ul>
              </div>
              <div class="form-group">
                <input type="number" class="form-control game-display"
                  placeholder="enter number"
                  onchange={e => send({type: 'number-change', data: e})}
                  value={state.guess} />
              </div>
              <div class="form-group">
                <button class="btn btn-lg btn-success btn-block"
                  onclick={e => send({ type: 'guess-number'})}>GUESS</button>
              </div>
            </div>
          }
          {
            state.outcome && state.outcome !== 'you win' &&
            <div class="form-group">
              <div class="game-outcome">
                <p>{state.outcome}</p>
                <i class={outcomeClass(state)} />
              </div>
            </div>
          }
          {
            state.outcome === 'you win' && <div class="form-group">
              <div class="game-outcome">
                <h3 class='win'>{state.outcome}</h3>
                <button class="btn btn-lg btn-success btn-block"
                  onClick={() => send({type:'EASY'})}>PLAY AGAIN</button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

// Effect for startup:
function initGame() {
  guessEngine.startNewGame('EASY')
}

// Initial state for program
const state = {
  guess: null,
  difficulty: 'EASY'
}

// Define program:
export const program = {
  init() {
    return [state]
  },
  view(state, send) {
    render(<Game {...{state, send}}/>, 'section')
  },
  update(state, msg) {
    const prevState = mergeObjects(state)
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
          prevState.indicator= indicator
        }
        return [prevState]
      case 'play-again':
        startGame('EASY')
        return [prevState]
    }
  },
  subscriptions(state, send) {
    return initGame()
  }
}
