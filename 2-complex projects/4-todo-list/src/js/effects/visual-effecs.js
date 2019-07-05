export function setFocus(input) {
  input.focus()
}
export function animateIn(li) {
  li.classList.add('add-item')
}
export function animateOut(li, done) {
  li.classList.add('delete-item')
  setTimeout(() => {
    done()
  }, 1000)
}
