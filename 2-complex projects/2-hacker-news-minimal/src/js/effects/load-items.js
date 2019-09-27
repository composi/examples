const API_ORIGIN = 'https://hacker-news.firebaseio.com'

const asJson = r => r.json()

// Effect to fetch data during program init:
export function loadItems(getState, send) {
  fetch(`${API_ORIGIN}/v0/topstories.json`)
    .then(asJson)
    .then(items => Promise.all(items.slice(0, 19).map(
      item => fetch(`${API_ORIGIN}/v0/item/${item}.json`).then(asJson)
    )))
    // Send fetched data to update action:
    .then(items => send({ type: 'load', data: items }))
}
