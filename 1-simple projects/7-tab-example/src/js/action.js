/**
 *
 * @param {import('./types').State} state
 * @param {import('./types').Message} msg
 * @param {import('./types').Send} send
 */
export function actions(state, msg, send) {
  state.activeId = msg.data
  return state
}
