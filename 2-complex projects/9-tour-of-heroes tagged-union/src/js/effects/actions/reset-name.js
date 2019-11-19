
/**
 * @param {import('../../types').State} state
 */
export const resetName = state => {
  state.selectedHero.name = state.selectedHero.originalName
  return state
}