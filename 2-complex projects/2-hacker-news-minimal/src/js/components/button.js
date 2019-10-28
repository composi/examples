import { h } from '@composi/core'

/**
 * @typedef {import('../types').Message} Message
 */
/**
 * @param {{onClick: () => Message, title: string}} props
 */
export default function Button({onClick, title}) {
  return <button class="button" onclick={onClick}>{title}</button>
}
