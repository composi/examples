import {ShowDetail, ActiveComponent} from '../../effects/messages'
/**
 * @param {import('../../types').State} data
 * @param {import('../../types').Send} send
 */
export const useFetchedHeroes = (data, send) => {
  const newState = { ...data }
  if (data.detail) {
    setTimeout(() => send(ShowDetail(data.detail)))
  } else {
    setTimeout(() => send(ActiveComponent(newState.activeComponent)))
  }
  return newState
}
