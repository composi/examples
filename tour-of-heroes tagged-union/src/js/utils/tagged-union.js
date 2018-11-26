import { union } from '@composi/core'

export const Msg = union(['UseFetchedHeroes', 'ActiveComponent', 'ShowDetail', 'DeleteItem', 'ChangeHeroName', 'ResetName', 'SaveName', 'NewHero', 'AddHero'])