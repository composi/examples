import { h } from '@composi/core'

export default function HeroSearch({search, searchResults, blurSearchInput}) {
  return (
    <div id="search-component">
      <h4>Hero Search</h4>

      <input id="search-box" onkeyup={e => search(e)} onblur={() => blurSearchInput()} />

      {
        searchResults.length > 0 && (
          <ul class="search-result">
            {
              searchResults.map(hero => (
                <li>
                  <a href={`#/detail/${hero.id}`}>{hero.name}</a>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
}
