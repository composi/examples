import { union } from '@composi/core'


// Tagged union for spreadsheet actions:
export const Msg = union('AddItem', 'DeleteItem', 'UpdateItemPrice', 'UpdateItemQuantity')
