import { h } from '@composi/core'

export function Title({ message }) {
  return (
    <nav>
      <h1 class="header--main">{message}</h1>
    </nav>
  )
}
