export function action(prevState, msg) {
  prevState.activeId = msg
  return [prevState]
}
