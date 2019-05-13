import { h } from '@composi/core'
import { sumUp } from '../effects/sum-up'

// Spreadsheet footer:
export function TableFooter({ state }) {
  return (
    <tfoot>
      <tr>
        <td colspan='3'>Sum:</td>
        <td colspan='2'>
          <span class='total'>${sumUp(state.fruits).toFixed(2)}</span>
        </td>
      </tr>
    </tfoot>
  )
}
