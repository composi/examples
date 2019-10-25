/**
 *
 * @param {import('./types').State} state
 * @param {import('./types').Message} msg
 * @param {import('./types').Send} send
 */
export function actions(state, msg, send) {
  const prevState = {...state}
  prevState.activeId = msg.data
  return prevState
}
