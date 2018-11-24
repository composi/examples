import { h } from '@composi/core'

export default function ({ send }) {
  return <button class="button" onclick={() => send({type: 'sort'})}>Sort!</button>
}