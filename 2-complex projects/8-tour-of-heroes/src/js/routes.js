
import {Router} from '@composi/router'

/**
 * Setup routes for program.
 * @param {import('./types').Program} program
 * @returns {void} undefined
 */
export function setupRoutes(program) {

  // Initialize router:
  const router = Router()
  // Use destructuring to capture the program's send function
  // so we can dispatch messages to it from the routes:
  const {send} = program

  router(
    {
      path: "/",
      action: () => send({type: 'active-component', data: 'dashboard'})
    },
    {
      path: '/dashboard',
      action: () => send({type: 'active-component', data: 'dashboard'})
    },
    {
      path: '/heroes',
      action: () => send({type: 'active-component', data: 'heroes'})
    }
    ,
    {
      path: '/detail/:id',
      action: id => send({type: 'show-detail', data: id})
    }
  )
}
