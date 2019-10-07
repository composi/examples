import { h, render } from '@composi/core'


// Placeholders for popup.
export let popup = undefined
export let popupImage = undefined

// Define effect to run when program starts:
export function createPopup(getState, send) {
  function Mask() {
    return (
      <div id="mask" onclick={() => send({ type: 'close-popup' })}>
        <div id="popup-image"></div>
      </div>
    )
  }
  render(<Mask />, '#mask')
}
