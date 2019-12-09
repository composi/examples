import {union} from '@composi/core'

/**
 * Define union.
 * @type {import('../types').MessageUnion}
 */
export const {
  match,
  SelectTile,
  JumpTo,
  UseFetchedData
} = union(
  'SelectTile',
  'JumpTo',
  'UseFetchedData'
)
