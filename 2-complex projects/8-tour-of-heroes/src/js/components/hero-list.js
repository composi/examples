import { h } from '@composi/core'

export function HeroList({state, send}) {
  if (!state || !state.heroes.length) {
    return ''
  } else if (state.activeComponent === 'heroes') {
    return (
      <div>
        <p class='form--add-hero'>
          <label htmlFor="add-hero">Hero name: </label>
          <input id='add-hero' type="text" oninput={e => send({type:'new-hero', data: e.target.value})} value={state.newHero}/>
          <button onclick={() => send({type: 'add-hero'})}>Add</button>
        </p>
        <ul class="heroes">
          {
            state.heroes.map(hero => (
              <li key={hero.id}>
                <a href={`#/detail/${hero.id}`}>
                  <span class="badge">{hero.id}</span>
                  <span class='hero-link'>{hero.name}</span>
                </a>
                <button data-id={hero.id} class="delete" title="delete hero" onclick={e => send({ type: 'delete-item', data: hero.id })}>x</button>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}
