const Controller = require('egg').Controller;

class LoginController extends Controller{
    async login(){
        const {ctx} = this;
        const {body} = ctx.request;
        if(!body.account){
            ctx.status = 402;
            ctx.body = {
                message:'账号不能为空',
                status:402
            }
            return
        }
        ctx.body = await ctx.service.login.login(body);
    }

    //  根据用户权限获取可见的路由页面
    async getRouter(){
        const {ctx} = this
        const user = ctx.$user;
        ctx.body = await ctx.service.login.getRouter(user)
    }

}

module.exports = LoginController