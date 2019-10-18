import { Msg } from './messages'
import { clone } from '@composi/merge-objects'

// Actions for spreadsheet:
export function actions(state, msg) {
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
      return prevState
    },
    'DeleteItem': product => {
      prevState.fruits = prevState.fruits.filter(fruit => fruit.product != product)
      return prevState
    },
    'UpdateItemPrice': item => {
      prevState.fruits[item.idx].price = parseInt(item.price)
      return prevState
    },
    'UpdateItemQuantity': item => {
      prevState.fruits[item.idx].quantity = parseInt(item.quantity)
      return prevState
    }
  })
}
