import {SaveLocally} from '../../effects/messages'

/**
 * @param {string} activeComponent
 * @param {import('../../types').State} state
 * @param {import('../../types').Send} send
 */
export const setActiveComponent = (activeComponent, state, send) => {
  const result = {...state, activeComponent}
  send(SaveLocally(result))
  return {...state, activeComponent}
}
