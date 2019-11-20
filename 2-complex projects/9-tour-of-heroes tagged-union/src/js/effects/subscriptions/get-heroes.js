import { idb } from '@composi/idb'
import { UseFetchedHeroes } from '../messages'


/**
 * @param {import('../../types').Send} send
 */
export const getHeroes = send => {
  (async () => {
    /** @type {import('../../types').State} */
    const savedState = await idb.get('toh-state')
    if (savedState) {
      send(UseFetchedHeroes(savedState))
    } else {
      const response = await fetch('/src/js/data/mock-heroes.json')
      /** @type {import('../../types').State} */
      const data = await response.json()
      send(UseFetchedHeroes(data))
    }
  })()
}
