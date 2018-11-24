import { h, render, union } from '@composi/core'
import { mergeObjects } from '@composi/merge-objects'
import { fruitData } from '../data'

function sumUp(rows) {
  let total = 0
  rows.forEach((row) => {
    total += row.price * row.quantity
  })
  return total
}


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

function TableFooter({ state}) {
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
        <input oninput={e => setProduct(e.target.value)} name='product' id='product' type="text" tabindex='1' />
      </p>
      <p>
        <label for="price">Price: </label>
        <input oninput={e => setPrice(e.target.value)} name='price' id='price' type="text" tabindex='2' />
      </p>
      <p>
        <label for="quantity">Quantity: </label>
        <input oninput={e => setQuantity(e.target.value)} name='quantity' id='quantity' type="text" tabindex='3' />
      </p>
      <p>
        <button onclick={() => send(Msg.AddItem({product, price, quantity}))} id='addRow'>Add Row</button>
      </p>
    </div>
  )
}

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


const state = {
  inputValue: '',
  fruits: fruitData
}

const Msg = union(['AddItem', 'DeleteItem', 'UpdateItemPrice', 'UpdateItemQuantity'])

function actions(msg, state) {
  const prevState = mergeObjects(state)
  return Msg.match(msg, {
    'AddItem': item => {
      prevState.fruits.push({
        product: item.product,
        price: parseInt(item.price),
        quantity: parseInt(item.quantity)
      })
      console.log(prevState)
      return [prevState]
    },
    'DeleteItem': product => {
      prevState.fruits = prevState.fruits.filter(fruit => fruit.product != product)
      return [prevState]
    },
    'UpdateItemPrice': item => {
      prevState.fruits[item.idx].price = parseInt(item.price)
      console.log(prevState.fruits)
      return [prevState]
    },
    'UpdateItemQuantity': item => {
      prevState.fruits[item.idx].quantity = parseInt(item.quantity)
      console.log(prevState.fruits)
      return [prevState]
    }
  })
}

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

export const program = {
  init() {
    return [state]
  },
  view(state, send) {
    return render(<SpreadSheet {...{state, send}}/>, 'section')
  },
  update(msg, state) {
    return actions(msg, state)
  }
}

/*
export class SpreadSheet extends Component{
  render(rows) {
    return (
      <ul class='list--spreadsheet'>
        <Spreadsheet {...{rows}}/>
        <AddNewRow/>
      </ul>
    )
  }

  addNewRow(e) {
    const productInput = this.element.querySelector('#product')
    const priceInput = this.element.querySelector('#price')
    const quantityInput = this.element.querySelector('#quantity')
    const product = productInput.value
    const price = Number(priceInput.value) || 0
    const quantity = Number(quantityInput.value) || 0
    productInput.value = ''
    priceInput.value = ''
    quantityInput.value = ''
    const state = this.state
    if (product) {
      state.push({product, price, quantity})
      this.state = state
    } else {
      alert('Please provide a product name before trying to add a row.')
    }
  }

  deleteRow(e) {
    const index = e.target.dataset.index
    console.log(index)
    const state = this.state
    state.splice(index, 1)
    this.state = state
  }

  updateQuantity(e) {
    const index = e.target.dataset.index
    const value = Number(e.target.value)
    const state = this.state
    state[index].quantity = value
    this.state = state
  }

  updatePrice(e) {
    const index = e.target.dataset.index
    const value = Number(e.target.value)
    const state = this.state
    state[index].price = value
    this.state = state
  }

  handleEvent(e) {
    e.target.id === 'addRow' && this.addNewRow(e)
    e.target.className === 'list-item__button--delete' && this.deleteRow(e)
    e.target.className === 'quantity' && this.updateQuantity(e)
    e.target.className === 'price' && this.updatePrice(e)
  }

  componentDidMount() {
    this.element.addEventListener('click', this)
    this.element.addEventListener('input', this)
  }
}
*/
