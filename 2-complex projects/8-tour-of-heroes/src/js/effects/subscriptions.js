export function getHeroes(state, send) {

  (async () => {
    const data = await fetch('/src/js/data/mock-heroes.json')
    const json = await data.json()
    send({ type: 'use-fetched-heroes', data: json })
  })()
}
