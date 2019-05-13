export function animateIn(el) {
  el.classList.add('add-item')
}

export function animateOut(li, done) {
  li.classList.add('delete-item')
  setTimeout(() => {
    done()
  }, 1000)
}
