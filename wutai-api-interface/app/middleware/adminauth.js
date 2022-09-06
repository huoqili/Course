const url = require('url');
module.exports = options=>{
    return async function index(ctx, next){
         
         let {pathname} = url.parse(ctx.url);
         let {FAIL} = ctx.app.config.code;
         let { app } = ctx;
         if(pathname === '/admin/login' || pathname === '/admin/upload'){
             await next();
         } else{
             let token = ctx.request.header.token;
             if(token){
                 try{
                    let result = app.jwt.verify(token,app.config.jwt.secret)
                    ctx.id = result.id;
                    ctx.username = result.username;
                    await next();
                 }catch(err){
                     console.log(err);
                     ctx.body = {
                         code:FAIL,
                         msg:'token解析失败'
                     } 
                     ctx.status = 401;
                 } 
                 
                 
             }else{
                 ctx.body = {
                     code:FAIL,
                     msg:'token不能为空'
                 }
                 ctx.status = 401;
             }
            
         }
    }
}