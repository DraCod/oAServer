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

    async test(){
        // this.ctx.body = {
        //     data:await this.ctx.service.login.test()
        // }
    }
}

module.exports = LoginController