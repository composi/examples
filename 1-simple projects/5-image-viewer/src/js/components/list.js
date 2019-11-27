import {h} from '@composi/core'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 */
/**
 * Define list component for images.
 * @param {{state: State, send: Send}} props
 */
export function List2({state, send}) {
  return (
    <div id="app">
      <ul class='list'>
        <li>One</li>
        <li>Two</li>
      </ul>
    </div>
  )
}
/**
 * @param {{state: State, send: Send}} props
 */
export function List({state, send}) {
  return (
    <div id="app">
      <ul class='list'>
        {
          state.map(cat => (
            <li key={cat.id}>
              <h2>{cat.name}</h2>
              <div onclick={() => send({type: 'show-image', data: cat.url})}
                class="image-container" style={{backgroundImage: `url(${cat.url})`}} />
              <div class="description">{cat.description}</div>
            </li>
          ))
        }
      </ul>
      <p class="add-more">
        <button onclick={() => send({type: 'add-10-more'})}>Show 10 More</button>
      </p>
    </div>
  )
}
