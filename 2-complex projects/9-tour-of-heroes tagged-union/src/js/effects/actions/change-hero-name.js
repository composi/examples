/**
 * @param {string} name
 * @param {import('../../types').State} state
 */
export const changeHeroName = (name, state) => {
  state.selectedHero.name = name
  return state
}
