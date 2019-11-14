import { union } from '@composi/core'

/**
 * Define union.
 * @type {import('../types').MessageUnion}
 */
export const Msg = union('SelectTile', 'JumpTo', 'UseFetchedData')

export const { SelectTile, JumpTo, UseFetchedData } = Msg
