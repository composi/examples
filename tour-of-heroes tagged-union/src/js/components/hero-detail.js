import { h } from '@composi/core'
import { Msg } from '../utils/tagged-union'

export default function HeroDetail({state, send}) {
  if (state.selectedHero) {
    let hero = state.selectedHero
    console.log('Got a hero')
    console.log(hero)
    return (
      <div id='hero-detail'>
        <h2>{hero.name} details!</h2>
        <div><label>id:</label> {hero.id}</div>
        <div>
          <label for='update-name'>name: </label>
          <input id='update-name' placeholder={hero.name} oninput={e => send(Msg.ChangeHeroName(e.target.value))} />
        </div>
        <p class='hero-detail--buttons'>
          <button onclick={() => send(Msg.ResetName())}>Reset</button>
          <button onclick={() => send(Msg.SaveName())}>Save</button>
        </p>
      </div>
    )
  }
}
