import { batch } from '@composi/core'
import { getHeroes } from './get-heroes'
import { setupRoutes } from './setup-routes'


export const subs = batch(getHeroes, setupRoutes)
