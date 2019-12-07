import {idb} from '@composi/idb'

/**
 *
 * @param {import('../../types').State} data
 */
export const saveLocally = (data) => {
  idb.set('toh-state', data)
  return data
}
