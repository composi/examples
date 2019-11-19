
/**
 * @param {string} value
 * @param {import('../../types').State} state
 */
export const search = (value, state) => {
  const searchResults = state.heroes.filter(hero => {
    const name = hero.name.toLowerCase()
    return name.match(value.toLowerCase())
  })
  return { ...state, searchResults }
}