
import { Router } from '@composi/router'
import { ActiveComponent, ShowDetail } from  './effects/messages'

/**
 * Setup routes for program.
 * @param {import('./types').Program} program
 * @returns {void} undefined
 */
export function setupRoutes(program) {
  // Setup router to track routes and send messages to update program:
  const router = Router()
  // Use destructuring to access the program's send function.
  // This will let us send messages to the program when routes change.
  const { send } = program

  router(
    {
      path: '/heroes',
      action: () => send(ActiveComponent('heroes'))
    },
    {
      path: '/detail/:id',
      action: id => send(ShowDetail(id))
    },
    {
      path: '*',
      action: () => send(ActiveComponent('dashboard'))
    }
  )

}
