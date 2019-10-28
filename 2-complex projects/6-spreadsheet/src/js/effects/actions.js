import { Msg } from './messages'

// Actions for spreadsheet:
/**
 * @param {import('../types').State} state
 * @param {import('../types').Message} msg
 * @param {import('../types').Send} send
 */
export function actions(state, msg, send) {
  const prevState = {...state}
  return Msg.match(msg, {
    addItem: item => {
      if (!item.product) return
      prevState.items.push({
        product: item.product,
        price: parseInt(item.price) || 0,
        quantity: parseInt(item.quantity) || 0
      })
      prevState.inputValue = ''
      return prevState
    },
    deleteItem: product => {
      prevState.items = prevState.items.filter(item => item.product != product)
      return prevState
    },
    updateItemPrice: item => {
      prevState.items[item.idx].price = parseInt(item.price)
      return prevState
    },
    updateItemQuantity: item => {
      prevState.items[item.idx].quantity = parseInt(item.quantity)
      return prevState
    }
  })
}
