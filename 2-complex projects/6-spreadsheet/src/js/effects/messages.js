import { union } from '@composi/core'


// Tagged union for spreadsheet actions:
/** @type {import('../types').MessageUnion} */
export const Msg = union('AddItem', 'DeleteItem', 'UpdateItemPrice', 'UpdateItemQuantity')

export const { AddItem, DeleteItem, UpdateItemPrice, UpdateItemQuantity } = Msg