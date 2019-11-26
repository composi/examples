import { SaveLocally } from "../messages"

/**
 * @param {number} id
 * @param {import('../../types').State} state
 * @param {import('../../types').Send} send
 */
export const deleteHero = (id, state, send) => {
  state.heroes = state.heroes.filter(hero => hero.id !== id)
  send(SaveLocally(state))
  return state
}
