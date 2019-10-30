import { idb } from '@composi/idb'
import { Msg } from './messages'

const { useFetchedHeroes } = Msg

/**
 * @param {import('../types').GetState} getState
 * @param {import('../types').Send} send
 */
export function getHeroes(getState, send) {
  (async () => {
    /** @type {import('../types').State} */
    const savedState = await idb.get('tof-state')
    if (savedState) {
      send(useFetchedHeroes({ ...savedState}))
    } else {
      const response = await fetch('/src/js/data/mock-heroes.json')
      const data = await response.json()
      send(useFetchedHeroes(data))
    }
  })()
}
