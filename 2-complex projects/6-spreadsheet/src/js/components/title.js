import { h } from '@composi/core'

export function Title({message}) {
  return (
    <header>
      <nav>
        <h1>{message}</h1>
      </nav>
    </header>
  )
}
