import {h} from '@composi/core'
import {AddItem} from '../effects/messages'

/**
 * Form to add new item to spreadsheet.
 * @typedef {import('../types').State} State
 * @typedef {import('../types').Send} Send
 * @param {{state: State, send: Send}} props
 * @returns {import('@composi/core').VNode}
 */
export function NewRowForm({state, send}) {
  let product, price, quantity
  function setProduct(value) {
    product = value
  }
  function setPrice(value) {
    price = value
  }
  function setQuantity(value) {
    quantity = value
  }
  return (
    <div id='newRowForm'>
      <p>
        <label for="product">Product: </label>
        <input value={state.inputValue} placeholder='product name' oninput={e => setProduct(e.target.value)} name='product' id='product' type="text" tabindex='1' />
      </p>
      <p>
        <label for="price">Price: </label>
        <input placeholder='0.00' oninput={e => setPrice(e.target.value)} name='price' id='price' type="text" tabindex='2' />
      </p>
      <p>
        <label for="quantity">Quantity: </label>
        <input placeholder='0.00' oninput={e => setQuantity(e.target.value)} name='quantity' id='quantity' type="text" tabindex='3' />
      </p>
      <p>
        <button onclick={() => send(AddItem({product, price, quantity}))} id='addRow'>Add Row</button>
      </p>
    </div>
  )
}
