import { union } from '@composi/core'

// Create tagged union for actions:
export const Msg = union('AddCounter', 'Increase', 'Decrease', 'Delete')
