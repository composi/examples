import { clone } from '@composi/merge-objects'

export function actions(state, msg) {
  const prevState = clone(state)
  prevState.activeId = msg
  return prevState
}
