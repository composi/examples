import { union } from '@composi/core'

/** Create a tagged union.
 * @type {import('../types').MessageUnion}
 */
export const Msg = union('UpdateInputValue', 'AddItem', 'DeleteItem', 'SetActiveState', 'ShowActive', 'ShowCompleted', 'ShowAll', 'RenderLocalState')

export const { UpdateInputValue, AddItem, DeleteItem, SetActiveState, ShowActive, ShowCompleted, ShowAll, RenderLocalState } = Msg
