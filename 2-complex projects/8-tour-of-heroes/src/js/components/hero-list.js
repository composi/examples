import { h } from '@composi/core'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 * @param {{state: State, send: Send}} props
 * @returns {import('@composi/core').VNode | string} VNode
 */
export function HeroList({state, send}) {
  if (!state || !state.heroes.length) {
    return ''
  } else if (state.activeComponent === 'heroes') {
    return (
      <div>
        <p class='form--add-hero'>
          <label for="add-hero">Hero name: </label>
          <input id='add-hero' type="text" oninput={e => send({type:'new-hero', data: e.target.value})} value={state.newHero}/>
          <button onclick={() => send({type: 'add-hero'})}>Add</button>
        </p>
        <ul class="heroes">
          {
            state.heroes.map(hero => {
              const {name, id} = hero
              return (
                <li key={id}>
                  <a href={`#/detail/${id}`}>
                    <span class="badge">{id}</span>
                    <span class='hero-link'>{name}</span>
                  </a>
                  <button data-id={id} class="delete" title="delete hero" onclick={e => send({ type: 'delete-item', data: id })}>x</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
