import {idb} from '@composi/idb'

/**
 *
 * @param {import('../../types').State} data
 * @param {import('../../types').State} state
 */
export const saveLocally = (data, state) => {
  idb.set('toh-state', data)
  return state
}