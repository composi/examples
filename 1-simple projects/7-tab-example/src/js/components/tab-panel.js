import {h} from '@composi/core'
import {Tab} from './tab'

/**
 * @param {{activeId: string, description: string}} props
 */
export const TabPanel = (props) => (
  <div class="tab-panels">
    <Tab activeId={props.activeId} description={props.description} />
  </div>
)
