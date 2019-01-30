module.exports = option => {
    return async function role(ctx, next) {
        try {
            console.log('获取用户角色');
            if(ctx.state && ctx.state.user) {
                ctx.user = {
                    username: ctx.state.user.role
                };
            }
            await next();
        } catch (err) {
            throw err
        }
    };
};