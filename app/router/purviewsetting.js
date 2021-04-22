module.exports = app=>{
    const { router, controller } = app;
    const jwt=app.middleware.jwt();
    router.get('/router-list',jwt,controller.purviewSetting.index.getAllRouter);//获取所有的页面路由
    router.post('/add-router',jwt,controller.purviewSetting.index.addRouter);//添加新路由页面
    router.post('/edit-router',jwt,controller.purviewSetting.index.editRouter);//添加新路由页面
}