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
}

module.exports = PurviewService;