import {union} from '@composi/core'

/**
 * Create tagged union for actions:
 * @type {import('../types').MessageUnion}
 */
export const Msg = union('AddCounter', 'Increase', 'Decrease', 'Delete')

// Destructure methods to use:
export const {match, AddCounter, Increase, Decrease, Delete} = Msg
