import {Router} from '@composi/router';

import {ActiveComponent, ShowDetail} from '../messages';

/**
 * Setup routes for program.
 * @param {import('../../types').Send} send
 * @returns {void} undefined
 */
export const setupRoutes = send => {
  setTimeout(() => {
    // Setup router to track routes and send messages to update program:
    const router = Router();

    router(
      {
        path: '/heroes',
        action: () => send(ActiveComponent, 'heroes')
      },
      {
        path: '/detail/:id',
        action: id => send(ShowDetail, id)
      },
      {
        path: '*',
        action: () => setTimeout(() => send(ActiveComponent, 'dashboard'), 100)
      }
    );
  });
};
