import { h } from '@composi/core'
import { Tab } from './tab'

export const TabPanel = (props) => (
  <div class="tab-panels">
    <Tab activeId={props.activeId} description={props.description} />
  </div>
)
