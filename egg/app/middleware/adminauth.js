module.exports = options =>{
    return async function adminauth(ctx,next){
        if(ctx.request.body.token){
            await next()
        }else{
            ctx.body={data:'没有登录'}
        }
    }
}