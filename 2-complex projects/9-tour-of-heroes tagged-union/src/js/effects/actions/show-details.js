import { SaveLocally } from "../messages"

/**
 * @param {number} id
 * @param {import('../../types').State} state
 * @param {import('../../types').Send} send
 */
export const showDetail = (id, state, send) => {
  if (!state.heroes) return
  const position = state.heroes.findIndex(person => person.id == id)
  if (position === -1) {
    state.activeComponent = 'heroes'
  } else {
    const hero = state.heroes[position]
    try {
      hero.originalName = hero.name
      state.activeComponent = 'detail'
      state.selectedHero = hero
      send(SaveLocally(state))
    } catch (err) {
    }
  }
  return state
}
