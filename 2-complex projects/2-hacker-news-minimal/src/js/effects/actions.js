import { sortByScore } from './sort-by-score'
import { loadItems } from './load-items'

// Actions for program update:
// 'load' handles effect from init.
// 'sort' sorts posts.
// 'reload' will reload data after sort.
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
      loadItems(prevState, send)
      prevState.lastUpdate = new Date()
      return prevState
  }
}
