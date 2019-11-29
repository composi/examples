import {h} from '@composi/core'
import {ListItem} from './hero-list-item'
import {NewHero, AddHero} from '../effects/messages'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 */
/**
 * @param {{state: State, send: Send}} props
 * @returns {import('@composi/core').VNode | string} VNode
 */
export function HeroList({state, send}) {
  if (!state || !state.heroes || !state.heroes.length) {
    return ''
  } else if (state.activeComponent === 'heroes') {
    return (
      <div>
        <p class='form--add-hero'>
          <label for="add-hero">Hero name: </label>
          <input id='add-hero' type="text" oninput={e => send(NewHero, e.target.value)} value={state.NewHero} />
          <button onclick={() => send(AddHero)}>Add</button>
        </p>
        <ul class="heroes">
          {
            state.heroes.map(hero => (
              <ListItem {...{hero, send}} />
            ))
          }
        </ul>
      </div>
    )
  }
}
