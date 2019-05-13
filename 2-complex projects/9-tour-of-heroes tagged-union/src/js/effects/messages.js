import { union } from '@composi/core'

export const Msg = union('useFetchedHeroes', 'activeComponent', 'showDetail', 'deleteHero', 'changeHeroName', 'resetName', 'saveName', 'newHero', 'addHero')
