import { union } from '@composi/core'

// Create a tagged union.
export const Msg = union('UpdateInputValue', 'AddItem', 'DeleteItem', 'SetActiveState', 'ShowActive', 'ShowCompleted', 'ShowAll', 'RenderLocalState')
