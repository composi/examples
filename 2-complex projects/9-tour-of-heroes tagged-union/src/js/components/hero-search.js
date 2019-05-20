import { h } from '@composi/core'
import { Msg } from '../effects/messages'
const { search, searchBlur } = Msg

export function HeroSearch({ state, send }) {
  return (
    <div id="search-component">
      <h4>Hero Search</h4>

      <input id="search-box" oninput={e => send(search(e.target.value))} />
        <ul class="search-result">
          {
            state && state.searchResults.map(hero => (
              <li>
                <a href={`#/detail/${hero.id}`}>{hero.name}</a>
              </li>
            ))
          }
      </ul>
    </div>
  )
}
