import { union } from '@composi/core'

/**
 * Define union.
 * @type {import('../types').MessageUnion}
 */
export const Msg = union('selectTile', 'jumpTo', 'useFetchedData')
