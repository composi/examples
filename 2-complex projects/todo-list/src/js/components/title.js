import { h } from '@composi/core'

export function Title({greeting}) {
  return (
    <nav>
      <h1 class="header--main">Composi {greeting}!</h1>
    </nav>
  )
}
