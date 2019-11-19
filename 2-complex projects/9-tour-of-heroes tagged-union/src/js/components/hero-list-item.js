import { h } from '@composi/core'
import { DeleteHero } from '../effects/messages'

/**
 * @typedef {import('../types').Hero} Hero
 * @typedef {import('../types').Send} Send
 */
/**
 * @param {{hero: Hero, send: Send}} props
 * @returns {import('@composi/core').VNode} VNode
 */
export function ListItem({ hero, send }) {
  const {name, id} = hero
  return (
    <li key={id}>
      <a href={`#/detail/${id}`}>
        <span class="badge">{id}</span>
        <span class='hero-link'>{name}</span>
      </a>
      <button data-id={id} class="delete" title="delete hero" onclick={e => send(DeleteHero(id))}>x</button>
    </li>
  )
}
