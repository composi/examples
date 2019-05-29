import { Msg } from './message'
const { useFetchedData } = Msg

export function fetchJsonData(getState, send) {
  (async () => {
    const data = await fetch('/src/js/data/state.json')
    const json = await data.json()
    send(useFetchedData(json))
  })()
}
