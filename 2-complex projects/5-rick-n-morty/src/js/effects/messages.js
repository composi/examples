import {union} from '@composi/core'

const Msg = union(
  'UpdateInputValue',
  'ShowCharacter',
  'ShowDashboard',
  'FindCharacter',
  'UseFetchedData'
)

export const {
  match,
  UpdateInputValue,
  ShowCharacter,
  ShowDashboard,
  FindCharacter,
  UseFetchedData
} = Msg