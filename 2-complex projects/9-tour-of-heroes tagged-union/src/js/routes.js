
import { Router } from '@composi/router'

/**
 * Setup routes for program.
 * @param {import('./types').Program} program
 * @param {import('./types').MessageUnion} Msg
 * @returns {void} undefined
 */
export function setupRoutes(program, Msg) {
  // Setup router to track routes and send messages to update program:
  const router = Router()
  // Use destructuring to access the program's send function.
  // This will let us send messages to the program when routes change.
  const { send } = program
  const { activeComponent, showDetail } = Msg

  router(
    {
      path: '/heroes',
      action: () => send(activeComponent('heroes'))
    },
    {
      path: '/detail/:id',
      action: id => send(showDetail(id))
    },
    {
      path: '*',
      action: () => send(activeComponent('dashboard'))
    }
  )

}
