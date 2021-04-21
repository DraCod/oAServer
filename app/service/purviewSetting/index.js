const Service = require('egg').Service;

class PurviewSettingService extends Service{
    async getAllRouter(){
        return {
            status:200,
            data:await this.ctx.model.Routers.findAll({
                attributes:['id','path','label','parents','created_at']
            }).then(async res=>{
                // console.log(res)
                // return res
                for (const row of res) {
                    if(row.dataValues.parents){
                        row.dataValues.parent = await this.ctx.model.Routers.findOne({
                            where:{
                                id:row.dataValues.parents
                            }
                        })
                    }
                }
                return res
            })
        }
    }
}

module.exports = PurviewSettingService