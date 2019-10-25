import { union } from '@composi/core'

/** @type {import('../types').MessageUnion} */
export const Msg = union('useFetchedHeroes', 'activeComponent', 'showDetail', 'deleteHero', 'changeHeroName', 'resetName', 'saveName', 'newHero', 'addHero', 'saveLocally', 'search')
