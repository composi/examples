import { ResetSearchResults } from '../messages'


export const resetSearchResults = send => {
  document.addEventListener('click', e => {
    send(ResetSearchResults())
  })
}
