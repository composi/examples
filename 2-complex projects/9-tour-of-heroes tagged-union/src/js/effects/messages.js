import { union } from '@composi/core'

/** @type {import('../types').MessageUnion} */
export const Msg = union('UseFetchedHeroes', 'ActiveComponent', 'ShowDetail', 'DeleteHero', 'ChangeHeroName', 'ResetName', 'SaveName', 'NewHero', 'AddHero', 'SaveLocally', 'Search', 'ResetSearchResults')

export const { UseFetchedHeroes, ActiveComponent, ShowDetail, DeleteHero, ChangeHeroName, ResetName, SaveName, NewHero, AddHero, SaveLocally, Search, ResetSearchResults} = Msg
