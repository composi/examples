import {SaveLocally} from "../messages"

/**
 * @param {import('../../types').State} state
 * @param {import('../../types').Send} send
 */
export const addHero = (state, send) => {
  if (state.NewHero) {
    state.heroes.push({
      id: state.newId++,
      name: state.NewHero
    })
    state.NewHero = ''
    send(SaveLocally(state))
  } else {
    alert('Please provide a name for the new hero before submitting.')
  }
  return state
}
