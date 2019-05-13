import { h } from '@composi/core'

export const TabHeader = ({ state, send }) => {
  return (
    <div class="tab-headers">
      {state.tabs.map(tab => (
        <button class={`tab ${state.activeId == tab.id ? 'selected' : ''}`} onclick={() => send(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  )
}
