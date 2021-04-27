module.exports = app=>{
    const { router, controller } = app;
    const jwt=app.middleware.jwt();
    router.get('/router-list',jwt,controller.purviewSetting.routers.getAllRouter);//获取所有的页面路由
    router.post('/add-router',jwt,controller.purviewSetting.routers.addRouter);//添加新路由页面
    router.post('/edit-router',jwt,controller.purviewSetting.routers.editRouter);//添加新路由页面
    router.delete('/delete-router/:id',jwt,controller.purviewSetting.routers.deleteRouter)//删除路由


    router.get('/purview-list',jwt,controller.purviewSetting.purview.getPurviewList)//获取权限列表
    router.get('/router-tree',jwt,controller.purviewSetting.purview.routerTree)//路由树
    router.post('/add-purview',jwt,controller.purviewSetting.purview.addPurview)//添加权限角色
    router.get('/purview-detail/:id',jwt,controller.purviewSetting.purview.purviewDetail)//角色详情
    router.post('/edit-purview',jwt,controller.purviewSetting.purview.editPurview)//编辑角色权限
    router.delete('/delete-purview/:id',jwt,controller.purviewSetting.purview.deletePurview)//删除角色



    router.get('/account-list',controller.purviewSetting.account.accountList)//账号列表
    router.post('/add-account',controller.purviewSetting.account.addAccount)//添加账号
}
