import { findCharacter } from './find-character'


/**
 * Define actions for program.
 * @param {import('../types').State} state
 * @param {import('../types').Message} msg
 * @param {import('../types').Send} send
 */
export function actions(state, msg, send) {
  // Clone state:
  let prevState = {...state}
  switch (msg.type) {
    case 'update-input-value':
    prevState.inputValue = msg.data
    return prevState
    case 'show-character':
      const target = msg.data.target.closest('.infobox')
      const characters = prevState.characters
      const id = target.dataset.id
      const character = characters.filter(char => id === char.id)[0]
      prevState.character = character
      prevState.dashboard = false
      return prevState
    case 'show-dashboard':
      prevState.dashboard = true
      return prevState
    case 'find-character':
      prevState = findCharacter(prevState)
      return prevState
    case 'use-fetched-data':
      return msg.data
  }
}
