module.exports = app=>{
    const { router, controller } = app;
    const jwt=app.middleware.jwt();
    router.get('/router-list',jwt,controller.purviewSetting.index.getAllRouter);//获取所有的页面路由
}