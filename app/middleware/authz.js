module.exports = options => {
    return async (ctx, next) => {
        try {
            let role = 'visitor';
            if(ctx.state && ctx.state.user && ctx.state.user.role) {
                role = ctx.state.user.role
            }
            const {originalUrl: path, method} = ctx;
            const {newEnforcer} = options;
            const enforcer = await newEnforcer();
            if (!enforcer.enforce(role, path, method)) {
                ctx.status = 403;
                ctx.body = {
                    code: 403,
                    data: {},
                    success: false,
                    msg: `没有操作权限`
                }
            }
            await next()
        } catch (e) {
            throw e
        }
    }
};