import { h } from '@composi/core'

export function Title({message}) {
  return (
    <header>
      <h1><a href="/">{message}</a></h1>
    </header>
  )
}
