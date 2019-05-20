import { idb } from '@composi/idb'
import { Msg } from './messages'
const { useFetchedHeroes } = Msg
const path = window.location.hash.split('/')
const activeComponent = path[1] || 'dashboard'
const detail = path[2]

export function getHeroes(state, send) {
  (async () => {
    const savedState = await idb.get('tof-state')
    if (savedState) {
      send(useFetchedHeroes(savedState))
    } else {
      const data = await fetch('/src/js/data/mock-heroes.json')
      const json = await data.json()
      send(useFetchedHeroes({ ...json, activeComponent, detail }))
    }
  })()
}
