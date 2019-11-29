import {h} from '@composi/core'
import {ShowCharacter} from '../effects/messages'

/**
 * @typedef {import('../types').Character} Character
 * @typedef {import('../types').Send} Send
 */
/**
 * Function to create a card (info box) for each character.
 * @param {{character: Character, send: Send}} props
 */
export function InfoBox({character, send}) {
  return (
    <div data-id={character.id} class="infobox closed" onclick={(e) => send(ShowCharacter, e.target)}>
      <div class="img" style={{backgroundImage: `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/77047/${character.image})`}}></div>

      <section class="stats">
        <h2>{character.name}</h2>
      </section>
    </div>
  )
}
