import { findCharacter } from './find-character'


// Define actions for program:
export function actions(prevState, msg) {
  switch (msg.type) {
    case 'show-character':
      const target = msg.data.target.closest('.infobox')
      const characters = prevState.characters
      const id = target.dataset.id
      const character = characters.filter(char => id === char.id)[0]
      prevState.character = character
      prevState.dashboard = false
      return [prevState]
    case 'show-dashboard':
      prevState.dashboard = 'true'
      return [prevState]
    case 'find-character':
      if (msg.data.keyCode == 13) {
        prevState = findCharacter(msg.data, prevState)
      }
      return [prevState]
    case 'use-fetched-data':
      return [msg.value]
  }
}
