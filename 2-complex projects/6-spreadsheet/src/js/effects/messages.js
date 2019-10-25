import { union } from '@composi/core'


// Tagged union for spreadsheet actions:
/** @type {import('../types').MessageUnion} */
export const Msg = union('addItem', 'deleteItem', 'updateItemPrice', 'updateItemQuantity')
