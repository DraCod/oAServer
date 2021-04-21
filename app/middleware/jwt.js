module.exports = option=>{
    return async function(ctx, next){
        try {
            const token = ctx.request.header.token;
            const user = ctx.app.jwt.verify(token);
            // {
            //     id:'',//用户id
            //     purviewsId:'',//权限id
            // }
            const redisToken = await ctx.app.redis.get(user.id);
            // console.log(redisToken,'redisToken')
            if(redisToken !== token){
                console.log('登录失效')
                ctx.status = 401
                ctx.body = {
                    status:401,
                    message:'请重新登录',
                    data:'登录信息过期'
                }
                return
            }

            // const redisToken = await ctx.app.redis.get(user.id)
            // if(redisToken!==token){
            //     ctx.status = 401;
            //     ctx.body = {
            //         status:401,
            //         message:'请先重新登录',
            //         data:'登录信息过期'
            //     }
            //     return
            //     // console.log(redisToken,token)
            // }
            delete user.iat
            ctx.$user = user
            // console.log(redisToken,'redisToken')
            await next();
        } catch (error) {
            console.log(error)
            ctx.status = 401;
            ctx.body = {
                status:401,
                message:'请先登录',
                data:error
            }
        }
    }
}