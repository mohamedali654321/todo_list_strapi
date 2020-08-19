module.exports=async(ctx,next)=>{

    
    
 ctx.request.body.user=ctx.state.user.id;
//    // console.log(ctx.request.body.user)

return await next();

}