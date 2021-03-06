import {h} from '@composi/core'

/**
 * Create header for spreadsheet.
 * @returns {import('@composi/core').VNode}
 */
export function TableHeader() {
  return (
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Total</th>
      <th></th>
    </tr>
  )
}
