import { union } from '@composi/core'

/** @type {import('../types').MessageUnion} */
export const Msg = union('ActiveComponent', 'AddHero', 'ChangeHeroName', 'DeleteHero', 'NewHero', 'ResetName', 'ResetSearchResults', 'SaveLocally', 'SaveName', 'Search', 'ShowDetail', 'UseFetchedHeroes')

export const { ActiveComponent, AddHero, ChangeHeroName, DeleteHero, NewHero, ResetName, ResetSearchResults, SaveLocally, SaveName, Search, ShowDetail, UseFetchedHeroes } = Msg
