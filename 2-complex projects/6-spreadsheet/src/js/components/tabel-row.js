import { h } from '@composi/core'
import { Msg } from '../effects/messages'
const { updateItemPrice, updateItemQuantity, deleteItem} = Msg

// Component to create a spreadsheet row:
export function TableRow({ row, idx, send }) {
  return (
    <tr>
      <td>{row.product}</td>
      <td>
        <input oninput={e => send(updateItemPrice({ price: e.target.value, idx: e.target.dataset.index }))} class='price' data-index={String(idx)} type='number' min='0' value={row.price.toFixed(2)} />
      </td>
      <td>
        <input oninput={e => send(updateItemQuantity({ quantity: e.target.value, idx: e.target.dataset.index }))} class='quantity' data-index={String(idx)} type='number' min='0' value={row.quantity} />
      </td>
      <td>
        <span class='total'>${(row.price * row.quantity).toFixed(2)}</span>
      </td>
      <td>
        <button onclick={() => send(deleteItem(row.product))} class='list-item__button--delete'>X</button>
      </td>
    </tr>
  )
}
