
/**
 * @param {import('../../types').State} state
 */
export const resetSearchResults = state => {
  state.searchResults = []
  return state
}
