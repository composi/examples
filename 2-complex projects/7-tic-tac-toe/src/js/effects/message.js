import { union } from '@composi/core'

// Define union:
export const Msg = union('handleSquareSelection', 'selectTile', 'jumpTo', 'useFetchedData')
