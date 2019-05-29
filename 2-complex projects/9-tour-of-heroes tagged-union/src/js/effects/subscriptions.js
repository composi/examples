import { idb } from '@composi/idb'
import { Msg } from './messages'

const { useFetchedHeroes } = Msg
// Check window location for any user interaction.
const path = window.location.hash.split('/')
const activeComponent = path[1] || 'dashboard'
const detail = path[2]

export function getHeroes(getState, send) {
  (async () => {
    const savedState = await idb.get('tof-state')
    if (savedState) {
      send(useFetchedHeroes({ ...savedState, activeComponent, detail}))
    } else {
      const data = await fetch('/src/js/data/mock-heroes.json')
      const json = await data.json()
      send(useFetchedHeroes({ ...json, activeComponent, detail }))
    }
  })()
}
