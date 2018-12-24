import { h } from '@composi/core'

export default function HeroDetail({state, send}) {
  if (state.selectedHero) {
    let hero = state.selectedHero
    return (
      <div id='hero-detail'>
        <h2>{hero.name} details!</h2>
        <div><label>id:</label> {hero.id}</div>
        <div>
          <label for='update-name'>name: </label>
          <input id='update-name' placeholder={hero.name} oninput={e => send({ type: 'change-hero-name', data: e.target.value })} />
        </div>
        <p class='hero-detail--buttons'>
          <button onclick={() => send({ type: 'reset-name' })}>Reset</button>
          <button onclick={() => send({ type: 'save-name' })}>Save</button>
        </p>
      </div>
    )
  }
}
