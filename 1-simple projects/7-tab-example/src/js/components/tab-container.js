import {h} from '@composi/core'
import {TabHeader} from './tab-header'
import {TabPanel} from './tab-panel'
/**
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 */
/**
 * @param {{state: State, send: Send}} props
 */
export function TabContainer({state, send}) {
  const result = state.tabs.find(item => state.activeId == item.id)
  return (
    <div class="tab-list">
      <TabHeader
        {...{state, send}}
      ></TabHeader>
      <TabPanel activeId={state.activeId} description={result.description} />
    </div>
  )
}
