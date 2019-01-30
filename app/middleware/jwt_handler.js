module.exports = option => {
    return async function auth(ctx, next) {
        try {
            await next();
        } catch (err) {
            const pathname = ctx.request.url;
            if(err.status === 401) {
                console.log(option);
                if(/api\/v1/g.test(pathname)) {
                    ctx.status = 401;
                    ctx.body = {
                        code: 401,
                        data: {},
                        success: false,
                        msg: `用户登录信息已失效，请尝试登录`
                    };
                } else {
                    console.log('验证登录失败，跳转至首页登录');
                    ctx.redirect('/login');
                }
            } else {
                throw err
            }
        }
    };
};