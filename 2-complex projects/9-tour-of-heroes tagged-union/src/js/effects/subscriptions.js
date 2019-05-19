import { Msg } from './messages'
const { useFetchedHeroes } = Msg
const path = window.location.hash.split('/')
const url = path[1]
const detail = path[2]

export function getHeroes(state, send) {
  (async () => {
    const data = await fetch('/src/js/data/mock-heroes.json')
    const json = await data.json()
    send(useFetchedHeroes({ json, url, detail }))
  })()
}
