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
        await this.ctx.model.Purviews.create({
            purview,
            routerId:router.join(',')
        })
        return {
            message:'新增成功',
            status:200
        }
    }
}

module.exports = PurviewService;