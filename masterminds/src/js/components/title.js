import { h } from '@composi/core'


export function Title({message}) {
  return (
    <nav>
      <i className="fa fa-gamepad fa-3x text-white my-auto"></i>
      <h1>Composi {message}!</h1>
    </nav>
  )
}
