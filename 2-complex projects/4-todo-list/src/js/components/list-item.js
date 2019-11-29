import {h} from '@composi/core'
import {animateIn, animateOut} from '../effects/visual-effecs'
import {Msg, SetActiveState, DeleteItem} from '../effects/messages'

/**
 * @typedef {import('../types').Item} Item
 * @typedef {import('../types').Send} Send
 */
/**
 * List Item Component:
 * @param {{item: Item, send: Send}} props
 */
export function ListItem({item, send}) {
  return (
    <li
      key={item.id}
      class={item.active ? 'active' : ''}
      hidden={item.hidden}
      onmount={animateIn}
      onunmount={animateOut}>
      <button class='set-state' onclick={() => send(SetActiveState, item.id)}>
        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="selection-indicator"><path d="M2,13 L9.9294326,16.8406135 L17.1937075,1.90173332" id="checkmark" stroke="#007AFF" stroke-width="2"></path></g></g></svg>
      </button>
      <h3 onclick={() => send(SetActiveState, item.id)}>{item.value}</h3>
      <button onclick={() => send(DeleteItem, item.id)} class="delete">
        <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Delete" stroke="#FF0000" stroke-width="2" stroke-linecap="square"><path d="M26.5,3.5 L3.5,26.5" id="Line"></path><path d="M3.5,3.5 L26.5,26.5" id="Line"></path></g></g></svg>
      </button>
    </li>
  )
}
