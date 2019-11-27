import {union} from '@composi/core'

/** Create a tagged union.
 * @type {import('../types').MessageUnion}
 */
export const Msg = union(
  'AddItem',
  'DeleteItem',
  'RenderLocalState',
  'SetActiveState',
  'ShowActive',
  'ShowAll',
  'ShowCompleted',
  'UpdateInputValue'
)

export const {
  match,
  AddItem,
  DeleteItem,
  RenderLocalState,
  SetActiveState,
  ShowActive,
  ShowAll,
  ShowCompleted,
  UpdateInputValue
} = Msg
