/**
 * @param {HTMLInputElement} input
 */
export const setFocus = input => input.focus()

/**
 * @param {HTMLLIElement} li
 */
export const animateIn = li => li.classList.add('add-item')

/**
 * @param {HTMLLIElement} li
 * @param {() => void} done
 */
export const animateOut = (li, done) => {
  li.classList.add('delete-item')
  setTimeout(() => done(), 1000)
}
