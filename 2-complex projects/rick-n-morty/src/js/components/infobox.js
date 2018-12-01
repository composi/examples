import {h} from '@composi/core'

/**
 * Function to create a card (info box) for each character.
 * @param {Object<string, any>} object
 */
export function InfoBox({ character, send }) {
  return (
    <div data-id={character.id} class="infobox closed" onclick={(e) => send({ type: "show-character", data: e })}>
      <div class="img" style={{ backgroundImage: `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/77047/${character.image})` }}></div>

      <section class="stats">
        <h2>{character.name}</h2>
      </section>
    </div>
  )
}