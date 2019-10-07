import { h } from '@composi/core'

export function Title({ message }) {
  return (
    <header>
      <nav>
        <i className="fa fa fa-clock-o fa-4x text-white"></i>
        <h1>Composi {message}</h1>
      </nav>
    </header>
  )
}
