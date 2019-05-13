export function getCharacters(state, send) {
  (async () => {
    let response = await fetch('/src/js/data/characters.json')
    let data = await response.json()
    state.characters = data
    state.character = data[0]
    send({ type: 'show-dashboard' })
  })()
}
