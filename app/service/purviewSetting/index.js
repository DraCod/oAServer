const Service = require('egg').Service;
const Sequelize = require('sequelize')

class PurviewSettingService extends Service{
    async getAllRouter({page,pageSize,label}){
        let limit=10;
        let offset=0;
        if(page&&pageSize){
            limit = + pageSize;//查几条
            offset = pageSize*(page-1);//忽略几条  从0开始
        }
        let where={};
        if(label){
            where.label={
                [Sequelize.Op.like]:`%${label}%`
            }
        }
        return {
            status:200,
            data:await this.ctx.model.Routers.findAndCountAll({
                where,
                limit,
                offset,
                attributes:['id','path','label','parents','created_at']
            }).then(async res=>{
                for (const row of res.rows) {
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

    async addRouter(body){
        const message=await this.valid(body);
        if(message) return message
        await this.ctx.model.Routers.create({
            path:body.path?body.path:null,
            label:body.label?body.label:null,
            parents:body.parents?body.parents:null
        })
        return {
            status:200,
            message:"添加成功"
        }
    }

    async editRouter(body){
        const message=await this.valid(body,true);
        if(message) return message
        await this.ctx.model.Routers.update({
            path:body.path?body.path:null,
            label:body.label?body.label:null,
            parents:body.parents?body.parents:null
        },{
            where:{
                id:body.id
            }
        })
        return {
            status:200,
            message:"修改成功"
        }
    }

    async valid(body,edit=false){
        let where={
            label:body.label
        }
        if(edit){
            where.id={
                [Sequelize.Op.ne]:body.id
            }
        }
        const find = await this.findRouter(where)
        if(find){
            this.ctx.status = 402;
            return{
                status:402,
                message:'存在相同的页面名称'
            }
        }
        where={
            path:body.path
        }
        if(edit){
            where.id={
                [Sequelize.Op.ne]:body.id
            }
        }
        const findPath = await this.findRouter(where)
        if(findPath){
            this.ctx.status = 402;
            return{
                status:402,
                message:'存在相同的页面路径'
            }
        }
        let parents
        if(body.parents){
            parents= await this.findRouter({
                id:body.parents
            })
        }
        if(!parents&&body.path&&body.parents){
            this.ctx.status = 402;
            return{
                status:402,
                message:'不存在该父级页面'
            }
        }
        if(parents&&parents.dataValues.parents){
            this.ctx.status = 402;
            return{
                status:402,
                message:'该父级页面又存在父级，不允许嵌套'
            }
        }
        if(parents&&parents.dataValues.path){
            this.ctx.status = 402;
            return{
                status:402,
                message:'该为父级页面，不允许嵌套'
            }
        }
    }


    async findRouter(where){
        return this.ctx.model.Routers.findOne({
            where
        })
    }
}

module.exports = PurviewSettingService