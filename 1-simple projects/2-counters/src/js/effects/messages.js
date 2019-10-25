import { union } from '@composi/core'

/**
 * create tagged union for actions:
 * @type {import('../types').MessageUnion}
 */
export const Msg = union('AddCounter', 'Increase', 'Decrease', 'Delete')
