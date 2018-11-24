import { h } from '@composi/core'
import HeroSearch from './hero-search'

export default function HeroDashboard({state, send}) {
  if (!state) {
    return ''
  } else {
    const selectHeroes = state.heroes.slice(1, 5)
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
      </div>
      )

  }
}
