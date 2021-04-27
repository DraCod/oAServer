const Service = require('egg').Service;

class AccountService extends Service{
    async accountList(){
        return{
            status:200,
            data:await this.ctx.model.Users.findAll({
                attributes:['id','created_at','account'],
                include:[
                    {
                        attributes:['id','purview'],
                        model:this.ctx.model.Purviews,
                        as:'purviews'
                    }
                ]
            })
        }
    }

    async addAccount({account,password,purview}){
        const find = await this.ctx.model.Users.findOne({
            where:{
                account
            }
        })
        if(find){
            this.ctx.status = 402;
            return{
                status:402,
                message:'存在相同的账号'
            }
        }
        const findPurview = await this.ctx.model.Purviews.findOne({
            where:{
                id:purview
            }
        })
        if(!findPurview){
            this.ctx.status = 402;
            return{
                status:402,
                message:'不存在该角色'
            }
        }
        await this.ctx.model.Users.create({
            account,
            password,
            purviewId:purview
        })
        return{
            message:'新增成功',
            status:200
        }
    }
}

module.exports = AccountService