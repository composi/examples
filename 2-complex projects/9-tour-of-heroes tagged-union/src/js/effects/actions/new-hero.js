
/**
 * @param {string} name
 * @param {import('../../types').State} state
 */
export const newHero = (name, state) => {
  state.NewHero = name
  return state
}
