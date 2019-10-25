import { buildData } from '../utils/build-data'

// Actions for program update:
/**
 * @param {import('../types').State} state
 * @param {import('../types').Message} msg
 * @param {import('../types').Send} send
 */
export function actions(state, msg, send) {
  const prevState = [].concat(state)
  // Coerce popup and popupImage to type HTMLElement:
  const popup = /** @type{HTMLElement} */(document.querySelector('#mask'))
  const popupImage = /** @type{HTMLElement} */(document.querySelector('#popup-image'))
  switch (msg.type) {
    // Add 10 more images:
    case 'add-10-more':
      const data = buildData(10)
      const newState = prevState.concat(data)
      return newState
    // Show chosen image in popup:
    case 'show-image':
      popup.style.display = 'flex';
      popupImage.style.backgroundImage = `url(${msg.data})`
      setTimeout(() => {
        popup.classList.add('opened')
        popupImage.classList.add('opened')
      }, 200)
      return prevState
    // Close the popup
    case 'close-popup':
      popup && popup.classList.remove('opened')
      popupImage.classList.remove('opened')
      setTimeout(() => {
        popup.style.display = 'none';
      }, 500)
      return prevState
  }
}
