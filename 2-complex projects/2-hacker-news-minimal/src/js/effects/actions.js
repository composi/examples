import {sortByScore} from './sort-by-score'
import {loadItems} from './load-items'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Message} Message
 * @typedef {import('../types').Send} Send
 */
/**
 * Actions for program update:
 * 'load' handles effect from init.
 * 'sort' sorts posts.
 * 'reload' will reload data after sort.
 * @param {State} prevState
 * @param {Message} msg
 * @param {Send} send
 */
export function actions(prevState, msg, send) {
  switch (msg.type) {
    case 'load':
      prevState.items = msg.data
      return prevState
    case 'sort':
      const sorted = sortByScore(prevState)
      prevState.items = sorted
      return prevState
    case 'reload':
      loadItems(send)
      prevState.lastUpdate = new Date()
      return prevState
  }
}
