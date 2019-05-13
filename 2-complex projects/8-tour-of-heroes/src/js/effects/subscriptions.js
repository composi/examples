export function getHeroes(state, send) {
  return fetch('/src/js/data/mock-heroes.json')
    .then(response => response.json())
    .then(data => {
      send({ type: 'use-fetched-heroes', data })
    })
}
