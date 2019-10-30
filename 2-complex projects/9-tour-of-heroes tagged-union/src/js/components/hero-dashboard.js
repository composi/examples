import { h } from '@composi/core'
import { HeroSearch } from './hero-search'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 */
/**
 * @param {{state: State, send: Send}} props
 * @returns {import('@composi/core').VNode | string} VNode
 */
export default function HeroDashboard({ state, send }) {
  if (!state) {
    return ''
  } else if (state.activeComponent === 'dashboard' && state.heroes) {
    const selectHeroes = state.heroes.slice(1, 5)
    if (!selectHeroes) return ''
    return (
      <div class='dashboard'>
        <h3>Top Heroes</h3>
        <div class="grid grid-pad">
          {
            selectHeroes.map(hero => (
              <a class="col-1-4" href={`#/detail/${hero.id}`}>
                <div class="module hero">
                  <h4>{hero.name}</h4>
                </div>
              </a>
            ))
          }
        </div>
        <HeroSearch {...{ state, send }}/>
      </div>
    )
  } else {
    return ''
  }
}
