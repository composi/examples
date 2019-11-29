import {h} from '@composi/core'
import {Search} from '../effects/messages'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 * @param {{state: State, send: Send}} props
 * @returns {import('@composi/core').VNode} VNode
 */
export function HeroSearch({state, send}) {
  return (
    <div id="search-component">
      <h4>Hero Search</h4>

      <input id="search-box" oninput={e => send(Search, e.target.value)} />
      <ul class="search-result">
        {
          state.searchResults && state.searchResults.map(hero => (
            <li>
              <a href={`#/detail/${hero.id}`}>{hero.name}</a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
