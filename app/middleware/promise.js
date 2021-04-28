const Sequelize = require('sequelize')
module.exports = option =>{
    return async function(ctx, next){
        const userId = ctx.$user.id;
        const purview = await ctx.model.Users.findOne({
            attributes:[],
            where:{
                id:userId
            },
            include:[
                {
                    attributes:['api_id'],
                    model:ctx.model.Purviews,
                    as:'purviews'
                }
            ]
        })
        const apiList = await ctx.model.Apis.findAll({
            attributes:['api'],
            where:{
                id:{
                    [Sequelize.Op.or]:purview.dataValues.purviews.dataValues.api_id.split(',')
                }
            }
        })
        const params = ctx.params
        const paramsKey = Object.keys(params)
        let url=ctx.request.url;
        if(paramsKey.length>0){
            url=url.split('/')
            url[url.length-1] = `:${paramsKey[0]}`
            url = url.join('/');
        }
        const find = apiList.find(row=>row.dataValues.api===url)
        if(find||purview.dataValues.purviews.dataValues.api_id=='0'){
            await next();
        }else{
            ctx.status = 403;
            ctx.body={
                message:'无权访问',
                status:403
            }
        }
    }
}