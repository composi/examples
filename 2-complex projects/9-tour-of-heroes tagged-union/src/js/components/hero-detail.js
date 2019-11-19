import { h } from '@composi/core'
import { ChangeHeroName, ResetName, SaveName } from '../effects/messages'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 * @param {{state: State, send: Send}} props
 * @returns {import('@composi/core').VNode} VNode
 */
export default function HeroDetail({ state, send }) {
  if (state.selectedHero && state.activeComponent === 'detail') {
    const {name, id} = state.selectedHero
    return (
      <div id='hero-detail'>
        <h2>{name} details!</h2>
        <div><label>id:</label> {id}</div>
        <div>
          <label for='update-name'>name: </label>
          <input value={name} id='update-name' placeholder={name} oninput={e => send(ChangeHeroName(e.target.value))} />
        </div>
        <p class='hero-detail--buttons'>
          <button onclick={() => send(ResetName())}>Reset</button>
          <button onclick={() => send(SaveName())}>Save</button>
        </p>
      </div>
    )
  }
}
