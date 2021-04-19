const Service = require('egg').Service;

class LoginService extends Service{
    async login(body){
        const user = await this.ctx.model.Users.findOne({
            where:{
                account:body.account
            }
        })
        if(user){
            return {
                message:'登录成功',
                status:200,
                data:this.ctx.app.jwt.sign({
                    id:user.dataValues.id,
                    purviewId:user.dataValues.purviewId
                },this.app.config.jwt.secret),
            }
        }else{
            this.ctx.status = 402;
            return {
                message:'账号或密码错误',
                status:402
            }
        }
    }

    async test(){
        // return this.ctx.model.Purviews.findOne({
        //     where:{
                
        //     }
        // })
    }
}

module.exports = LoginService;