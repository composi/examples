import { Router } from '@composi/router'

/**
 * Setup routes for program.
 * @param {import('../../types').Send} send
 * @returns {void} undefined
 */
export function setupRoutes(send) {
  setTimeout(() => {
    // Initialize router:
    const router = Router()

    router(
      {
        path: "/",
        action: () => send({ type: 'active-component', data: 'dashboard' })
      },
      {
        path: '/dashboard',
        action: () => send({ type: 'active-component', data: 'dashboard' })
      },
      {
        path: '/heroes',
        action: () => send({ type: 'active-component', data: 'heroes' })
      }
      ,
      {
        path: '/detail/:id',
        action: id => send({ type: 'show-detail', data: id })
      }
    )
  })
}
