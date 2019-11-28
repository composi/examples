import {findCharacter} from './find-character'
import {match} from './messages'


/**
 * Define actions for program.
 * @param {import('../types').State} state
 * @param {import('../types').Message} msg
 * @param {import('../types').Send} send
 */
export function actions(state, msg, send) {
  return match(msg, {
    UpdateInputValue: () => {
      state.inputValue = msg.data
      return state
    },
    ShowCharacter: (element) => {
      const target = element.closest('.infobox')
      const characters = state.characters
      const id = target.dataset.id
      const character = characters.filter(char => id === char.id)[0]
      state.character = character
      state.dashboard = false
      return state
    },
    ShowDashboard: () => {
      state.dashboard = true
      return state
    },
    FindCharacter: () => {
      state = findCharacter(state)
      return state
    },
    UseFetchedData: (data) => data
  })
}
