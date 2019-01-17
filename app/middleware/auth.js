module.exports = option => {
    return async function auth(ctx, next) {
        try {
            await next();
        } catch (err) {
            if(err.status === 401) {
                console.log(option);
                console.log('验证登录失败，跳转至首页登录');
                ctx.redirect('/login');
            } else {
                throw err
            }
            // if(pathname == '/admin/login' || pathname == '/admin/doLogin' || pathname == '/admin/verify'){
            //     await next()
            // }
        }
    };
};