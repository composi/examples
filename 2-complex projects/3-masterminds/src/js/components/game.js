import { h } from '@composi/core'
import { DifficultyLevel, GuessEngine } from '../lib/GuessEngine';

export const guessEngine = new GuessEngine();

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


export function Game({state, send}) {
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
