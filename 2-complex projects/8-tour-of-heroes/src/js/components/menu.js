import {h} from '@composi/core'

/**
 * @returns {import('../types').VNode} VNode
 */
export function Menu() {
  return (
    <menu >
      <nav>
        <ul>
          <li><a href="#/dashboard">Dashboard</a></li>
          <li><a href="#/heroes">Heroes</a></li>
        </ul>
      </nav>
    </menu >
  )
}
