import { h } from '@composi/core'

export function Title({message}) {
  return (
    <nav>
      <i className="fa fa-film fa-2x text-white my-auto"></i>
      <h1>Composi {message}</h1>
    </nav>
  )
}
