import { batch } from '@composi/core'
import { getHeroes } from './get-heroes'
import { setupRoutes } from './setup-routes'
import { resetSearchResults } from './reset-search-results'


export const subs = batch(getHeroes, setupRoutes, resetSearchResults)
