import { h } from '@composi/core'
import { Msg } from '../effects/messages'
const { changeHeroName, resetName, saveName } = Msg

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 * @param {{state: State, send: Send}} props
 * @returns {import('@composi/core').VNode} VNode
 */
export default function HeroDetail({ state, send }) {
  if (state.selectedHero && state.activeComponent === 'detail') {
    let hero = state.selectedHero
    return (
      <div id='hero-detail'>
        <h2>{hero.name} details!</h2>
        <div><label>id:</label> {hero.id}</div>
        <div>
          <label for='update-name'>name: </label>
          <input value={hero.name} id='update-name' placeholder={hero.name} oninput={e => send(changeHeroName(e.target.value))} />
        </div>
        <p class='hero-detail--buttons'>
          <button onclick={() => send(resetName())}>Reset</button>
          <button onclick={() => send(saveName())}>Save</button>
        </p>
      </div>
    )
  }
}
