import {union} from '@composi/core'

/** @type {import('../types').MessageUnion} */

export const {
  match,
  ActiveComponent,
  AddHero,
  ChangeHeroName,
  DeleteHero,
  NewHero,
  ResetName,
  ResetSearchResults,
  SaveLocally,
  SaveName,
  Search,
  ShowDetail,
  UseFetchedHeroes
} = union(
  'ActiveComponent',
  'AddHero',
  'ChangeHeroName',
  'DeleteHero',
  'NewHero',
  'ResetName',
  'ResetSearchResults',
  'SaveLocally',
  'SaveName',
  'Search',
  'ShowDetail',
  'UseFetchedHeroes'
)
