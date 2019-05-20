import { h } from '@composi/core'
import { ListItem } from './hero-list-item'
import { Msg } from '../effects/messages'
const { newHero, addHero, deleteHero } = Msg

export function HeroList({ state, send }) {
  if (!state || !state.heroes || !state.heroes.length) {
    return ''
  } else if (state.activeComponent === 'heroes') {
    return (
      <div>
        <p class='form--add-hero'>
          <label htmlFor="add-hero">Hero name: </label>
          <input id='add-hero' type="text" oninput={e => send(newHero(e.target.value))} value={state.newHero} />
          <button onclick={() => send(addHero())}>Add</button>
        </p>
        <ul class="heroes">
          {
            state.heroes.map(hero => (
              <ListItem {...{hero, send}}/>
            ))
          }
        </ul>
      </div>
    )
  }
}
