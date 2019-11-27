import {findCharacter} from './find-character'
import {match} from './messages'


/**
 * Define actions for program.
 * @param {import('../types').State} state
 * @param {import('../types').Message} msg
 * @param {import('../types').Send} send
 */
export function actions(state, msg, send) {
  // Clone state:
  let prevState = {...state}
  return match(msg, {
    UpdateInputValue: () => {
      prevState.inputValue = msg.data
      return prevState
    },
    ShowCharacter: (element) => {
      const target = element.closest('.infobox')
      const characters = prevState.characters
      const id = target.dataset.id
      const character = characters.filter(char => id === char.id)[0]
      prevState.character = character
      prevState.dashboard = false
      return prevState
    },
    ShowDashboard: () => {
      prevState.dashboard = true
      return prevState
    },
    FindCharacter: () => {
      prevState = findCharacter(prevState)
      return prevState
    },
    UseFetchedData: (data) => data
  })
}
