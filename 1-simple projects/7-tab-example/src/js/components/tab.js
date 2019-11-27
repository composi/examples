import {h} from '@composi/core'

/**
 * @param {{activeId: string, description: string}} props
 */
export const Tab = (props) => (
  <div class="tab-content">
    <p>You chose tab: <strong>{props.activeId}</strong></p>
    <p>{props.description}</p>
  </div>
)
