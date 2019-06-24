import { h } from '@composi/core'


export default function Button({onClick, title}) {
  return <button class="button" onclick={onClick}>{title}</button>
}
