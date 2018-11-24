import { h } from '@composi/core'

export function Title({message}) {
  return (
    <nav>
      <h1 class="header--main">@composi/core {message}!</h1>
    </nav>
  )
}
