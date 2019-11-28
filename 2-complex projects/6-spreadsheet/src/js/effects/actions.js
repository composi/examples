import {match} from './messages'

// Actions for spreadsheet:
/**
 * @param {import('../types').State} state
 * @param {import('../types').Message} msg
 * @param {import('../types').Send} send
 */
export function actions(state, msg, send) {
  return match(msg, {
    AddItem: item => {
      if (!item.product) return
      state.items.push({
        product: item.product,
        price: parseInt(item.price) || 0,
        quantity: parseInt(item.quantity) || 0
      })
      state.inputValue = ''
      return state
    },
    DeleteItem: product => {
      state.items = state.items.filter(item => item.product != product)
      return state
    },
    UpdateItemPrice: item => {
      state.items[item.idx].price = parseInt(item.price)
      return state
    },
    UpdateItemQuantity: item => {
      state.items[item.idx].quantity = parseInt(item.quantity)
      return state
    }
  })
}
