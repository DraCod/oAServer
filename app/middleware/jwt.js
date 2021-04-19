module.exports = option=>{
    return function(ctx, next){
        try {
            const token = ctx.request.header.token;
            const user = ctx.app.jwt.verify(token)
            delete user.iat
            ctx.$user = user
            // console.log(ctx.$user)
            next();
        } catch (error) {
            ctx.status = 401;
            ctx.body = {
                status:401,
                message:'请先登录',
                data:error
            }
        }
    }
}