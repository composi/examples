import { h } from '@composi/core'
import { Msg } from '../effects/messages'
const { deleteHero } = Msg


export function ListItem({ hero, send }) {
  return (
    <li key={hero.id}>
      <a href={`#/detail/${hero.id}`}>
        <span class="badge">{hero.id}</span>
        <span class='hero-link'>{hero.name}</span>
      </a>
      <button data-id={hero.id} class="delete" title="delete hero" onclick={e => send(deleteHero(hero.id))}>x</button>
    </li>
  )
}
