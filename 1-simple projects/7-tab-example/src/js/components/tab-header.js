import { h } from '@composi/core'

/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 */
/**
 * @param {{state: State, send: Send}} props
 */
export const TabHeader = ({ state, send }) => {
  return (
    <div class="tab-headers">
      {state.tabs.map(tab => (
        <button class={`tab ${state.activeId == tab.id ? 'selected' : ''}`} onclick={() => send({type: 'tab-update', data: tab.id})}>
          {tab.label}
        </button>
      ))}
    </div>
  )
}
