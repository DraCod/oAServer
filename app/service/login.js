const Service = require('egg').Service;
const Sequelize = require('sequelize')

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

    async getRouter({id,purviewId}){
        const purview = await this.ctx.model.Purviews.findOne({
            where:{
                id:purviewId
            }
        })
        let where={};
        if(purview.dataValues.routerId !== '0'){
            where.id={
                [Sequelize.Op.or]:purview.dataValues.routerId.split(','),
            }
            where.parents=null
        }
        const routerList = await this.ctx.model.Routers.findAll({
            where,
            attributes:['id','path','label'],
        })
        for (const row of routerList) {
            if(!row.dataValues.path){
                console.log(row,'row')
                row.dataValues.children = await this.ctx.model.Routers.findAll({
                    attributes:['id','path','label','parents'],
                    where:{
                        parents:row.dataValues.id
                    }
                })
                delete row.dataValues.path
            }
        }

        //在中间件中next添加await 等待结果
        return{
            status:200,
            data:routerList
        }
    }
}

module.exports = LoginService;