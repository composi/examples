import { h, render, union } from '@composi/core'
import { clone } from '@composi/merge-objects'
import { fruitData } from '../data'

// Get sum of all items:
function sumUp(rows) {
  let total = 0
  rows.forEach((row) => {
    total += row.price * row.quantity
  })
  return total
}

// Create header for spreadsheet:
function TableHeader() {
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

// Component to create a spreadsheet row:
function TableRow({row, idx, send}) {
  return (
    <tr>
      <td>{row.product}</td>
      <td>
        <input oninput={e => send(Msg.UpdateItemPrice({price: e.target.value, idx: e.target.dataset.index}))} class='price' data-index={String(idx)} type='number' min='0' value={row.price.toFixed(2)}/>
      </td>
      <td>
        <input oninput={e => send(Msg.UpdateItemQuantity({ quantity: e.target.value, idx: e.target.dataset.index }))} class='quantity' data-index={String(idx)} type='number' min='0' value={row.quantity}/>
      </td>
      <td>
        <span class='total'>${(row.price * row.quantity).toFixed(2)}</span>
      </td>
      <td>
        <button onclick={() => send(Msg.DeleteItem(row.product))} class='list-item__button--delete'>X</button>
      </td>
    </tr>
  )
}

// Spreadsheet footer:
function TableFooter({state}) {
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

// Form to add new item to spreadsheet:
function NewRowForm({send}) {
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
        <button onclick={() => send(Msg.AddItem({product, price, quantity}))} id='addRow'>Add Row</button>
      </p>
    </div>
  )
}

// Combine parts of spreadsheet into one component:
function Spreadsheet({state, send}) {
  return (
    <li class='list--spreadsheet__item'>
      <table id='spreadsheet'>
        <TableHeader/>
        {
          state.fruits.map((row, idx) => (
            <TableRow {...{row, idx, send}}/>
          ))
        }
        <TableFooter {...{ state}}/>
      </table>
    </li>
  )
}

// Inital state for program:
const state = {
  inputValue: '',
  fruits: fruitData
}

// Tagged union for spreadsheet actions:
const Msg = union('AddItem', 'DeleteItem', 'UpdateItemPrice', 'UpdateItemQuantity')


// Actions for spreadsheet:
function actions(state, msg) {
  const prevState = clone(state)
  return Msg.match(msg, {
    'AddItem': item => {
      if (!item.product) return
      prevState.fruits.push({
        product: item.product,
        price: parseInt(item.price) || 0,
        quantity: parseInt(item.quantity) || 0
      })
      prevState.inputValue = ''
      return [prevState]
    },
    'DeleteItem': product => {
      prevState.fruits = prevState.fruits.filter(fruit => fruit.product != product)
      return [prevState]
    },
    'UpdateItemPrice': item => {
      prevState.fruits[item.idx].price = parseInt(item.price)
      return [prevState]
    },
    'UpdateItemQuantity': item => {
      prevState.fruits[item.idx].quantity = parseInt(item.quantity)
      return [prevState]
    }
  })
}

// Create complete spreadsheet:
function SpreadSheet({state, send}) {
  return (
    <ul class='list--spreadsheet'>
      <Spreadsheet {...{ state, send }} />
      <li class='list--spreadsheet__item'>
        <NewRowForm {...{send}} />
      </li>
    </ul>
  )
}

// Define program to setup and run spreadsheet.
export const program = {
  init() {
    return [state]
  },
  view(state, send) {
    return render(<SpreadSheet {...{state, send}}/>, 'section')
  },
  update(state, msg) {
    return actions(state, msg)
  }
}
