import { clone } from '@composi/merge-objects'

export function getCharacters(getState, send) {
  (async () => {
    const state = clone(getState())
    let response = await fetch('/src/js/data/characters.json')
    let data = await response.json()
    state.characters = data
    state.character = data[0]
    send({type: 'use-fetched-data', value: state})
  })()
}
