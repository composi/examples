import { h } from '@composi/core'
import { sumUp } from '../effects/sum-up'

/**
 * Spreadsheet footer.
 * @param {{state: import('../types').State}} props
 * @returns {import('@composi/core').VNode} VNode
 */
export function TableFooter({ state }) {
  return (
    <tfoot>
      <tr>
        <td colspan='3'>Sum:</td>
        <td colspan='2'>
          <span class='total'>${sumUp(state.items).toFixed(2)}</span>
        </td>
      </tr>
    </tfoot>
  )
}
