/**
 * Action to sort posts:
 * @param {import('../types').State} state
 */
export function sortByScore(state) {
  let items = state.items
  items.sort((a, b) => b.score - a.score)
  return state.items = items
}
