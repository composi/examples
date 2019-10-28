/**
 * @param {HTMLInputElement} input
 */
export function setFocus(input) {
  input.focus()
}

/**
 * @param {HTMLLIElement} li
 */
export function animateIn(li) {
  li.classList.add('add-item')
}
/**
 * @param {HTMLLIElement} li
 * @param {() => void} done
 */
export function animateOut(li, done) {
  li.classList.add('delete-item')
  setTimeout(() => {
    done()
  }, 1000)
}
