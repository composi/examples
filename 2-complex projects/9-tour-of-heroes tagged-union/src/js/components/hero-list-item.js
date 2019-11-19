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
  return (
    <li key={hero.id}>
      <a href={`#/detail/${hero.id}`}>
        <span class="badge">{hero.id}</span>
        <span class='hero-link'>{hero.name}</span>
      </a>
      <button data-id={hero.id} class="delete" title="delete hero" onclick={e => send(DeleteHero(hero.id))}>x</button>
    </li>
  )
}
