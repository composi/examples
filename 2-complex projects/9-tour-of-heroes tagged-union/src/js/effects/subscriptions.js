import { idb } from '@composi/idb'
import { Msg } from './messages'

const { useFetchedHeroes } = Msg
// Check window location for any user interaction.
const path = window.location.hash.split('/')
const activeComponent = path[1] || 'dashboard'
const detail = path[2]

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
      send(useFetchedHeroes({ ...data}))
    }
  })()
}
