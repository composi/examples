import { union } from '@composi/core'

export const Msg = union(['UseFetchedHeroes', 'ActivateComponent', 'ShowDetail', 'DeleteItem', 'ChangeHeroName', 'ResetName', 'SaveName', 'NewHero', 'AddHero'])