import {h} from '@composi/core'

/**
 * @param {{message: string}} props
 * @returns {import('@composi/core').VNode} VNode
 */
export function Title({message}) {
  return (
    <header>
      <h1><a href="/">{message}</a></h1>
    </header>
  )
}
