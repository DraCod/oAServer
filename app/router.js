'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // const jwt=app.middleware.jwt();
  router.post('/login', controller.login.login);
  router.post('/test',jwt, controller.login.test);
};
