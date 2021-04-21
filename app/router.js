'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt=app.middleware.jwt();
  router.post('/login', controller.login.login);//用户登录
  router.get('/router-init',jwt, controller.login.getRouter);//初始化页面的路由

  require('./router/purviewsetting')(app)
};
