import {Msg} from './message'
import {UseFetchedData} from '../effects/message'

/**
 * @param {import('../types').Send} send
 */
export function fetchJsonData(send) {
  (async () => {
    const data = await fetch('/src/js/data/state.json')
    const json = await data.json()
    send(UseFetchedData(json))
  })()
}
