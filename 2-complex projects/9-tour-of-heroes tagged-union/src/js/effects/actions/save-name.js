import { SaveLocally } from "../messages"

/**
 * @param {import('../../types').State} state
 * @param {import('../../types').Send} send
 */
export const saveName = (state, send) => {
  window.location.hash = '#/heroes'
  send(SaveLocally(state))
  return state
}