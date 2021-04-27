const Service = require('egg').Service;
const Sequelize = require('sequelize')

class PurviewService extends Service{
    async getPurviewList(){
        return{
            //同步计算时间取决与CPU
            status:200,
            data:await Promise.all([
                this.ctx.model.Purviews.findAll({
                    attributes:['id','purview','routerId','created_at']
                }),
                this.ctx.model.Routers.findAll({
                    attributes:['id','label'],
                })
            ]).then(([Purviews,Routers])=>{
                Purviews.forEach(element => {
                    if(element.dataValues.routerId==0){
                        element.dataValues.router=[]
                        return
                    }
                    let router=[]
                    const arr=element.dataValues.routerId.split(',');
                    arr.forEach(ro=>{
                        router.push(Routers.find(r=>r.dataValues.id==ro))
                    })
                    element.dataValues.router=router;
                });
                return Purviews
            })
        }

        // 取决与数据库的压力
        // return{
        //     status:200,
        //     message:'查询成功',
        //     data:await this.ctx.model.Purviews.findAll({
        //         attributes:['id','purview','routerId','createdAt']
        //     }).then(async res=>{
        //         for (const row of res) {
        //             const arr = row.dataValues.routerId.split(',')
        //             await this.ctx.model.Routers.findAll({
        //                 attributes:['id','label'],
        //                 where:{
        //                     id:{
        //                         [Sequelize.Op.or]:arr
        //                     }
        //                 }
        //             }).then(res=>{
        //                 row.dataValues.router = res
        //             })
        //         }
        //         return res
        //     })
        // } 
    }

    async routerTree(){
        const list = await this.ctx.model.Routers.findAll({
            attributes:['id','path','label','parents']
        });
        const tree = list.filter(ro=>ro.dataValues.parents==null);
        const other =  list.filter(ro=>ro.dataValues.parents!=null);
        other.forEach(row=>{
            const find = tree.find(ro=>ro.dataValues.id===row.dataValues.parents);
            if(find.dataValues.children){
                find.dataValues.children.push(row)
            }else{
                find.dataValues.children = [row]
            }
        })
        return {
            status:200,
            data:tree,
        }
    }

    async addPurview({purview,router}){
        const result = await this.vialPurview(router)
        if(result){
            return{
                status:402,
                message:result
            }
        }
        await this.ctx.model.Purviews.create({
            purview,
            routerId:router.join(',')
        })
        return {
            message:'新增成功',
            status:200
        }
    }

    async vialPurview(router){
        const list = await this.ctx.model.Routers.findAll({
            attributes:['id'],
            where:{
                id:{
                    [Sequelize.Op.or]:router
                }
            }
        })
        if(list.length!=router.length){
            for (const ro of router) {
                //可异步，可中断
                const find = list.find(row=>ro===row.dataValues.id)
                console.log(find)
                if(!find){
                    this.ctx.status = 402;
                    return{
                        message:`有不存在的路由id=>${ro}`,
                        status:402
                    }
                }
            }
            // listing.forEach(async ro=>{
                //forEach强制跑完，且不等待异步
                // const find = list.find(row=>ro===row.dataValues.id)
                // console.log(find)
                // if(!find){
                //     this.ctx.status = 402;
                //     return{
                //         message:`有不存在的路由id=>${ro}`,
                //         status:402
                //     }
                // }
            // })
        }
    }

    async purviewDetail({id}){
        id=+id;
        const purview = await this.ctx.model.Purviews.findOne({
            where:{
                id
            }
        })
        const list = await this.ctx.model.Routers.findAll({
            attributes:['id','path','label','parents']
        });
        const purviewRouter = purview.dataValues.routerId.split(',')
        list.forEach(ro=>{
            const find = purviewRouter.find(row=>row==ro.dataValues.id)
            if(find){
                ro.dataValues.check = true
            }else{
                ro.dataValues.check = false
            }
        })
        const tree = list.filter(ro=>ro.dataValues.parents==null);
        const other =  list.filter(ro=>ro.dataValues.parents!=null);
        other.forEach(row=>{
            const find = tree.find(ro=>ro.dataValues.id===row.dataValues.parents);
            if(find.dataValues.children){
                find.dataValues.children.push(row)
            }else{
                find.dataValues.children = [row]
            }
        })
        purview.dataValues.tree = tree
        return {
            status:200,
            data:purview,
        }
    }

    async editPurview(body){
        const find = await this.ctx.model.Purviews.findOne({
            attributes:['id'],
            where:{
                id:body.id
            }
        })
        if(!find){
            this.ctx.status = 402
            return{
                status:402,
                message:'不存在该角色id'
            }
        }
        const result = await this.vialPurview(body.router)
        if(result){
            return{
                status:402,
                message:result
            }
        }
        await this.ctx.model.Purviews.update({
            routerId:body.router.join(','),
            purview:body.purview
        },{
            where:{
                id:body.id
            }
        })
        return {
            status:200,
            message:'更新成功'
        }
    }

    async deletePurview({id}){
        id=+id;
        const find = await this.ctx.model.Purviews.findOne({
            where:{
                id
            }
        })
        if(!find){
            this.ctx.status = 402;
            return{
                status:402,
                message:'不存在该角色id'
            }
        }
        await this.ctx.model.Purviews.destroy({
            where:{id}
        })
        return {
            message:'删除成功',
            status:200
        }
    }
}

module.exports = PurviewService;