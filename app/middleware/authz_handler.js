module.exports = option => {
    return async function authzHandler(ctx, next) {
        try {
            console.log(ctx.status);

            if(ctx.status === 403) {
                ctx.body = {
                    code: 403,
                    data: {},
                    success: false,
                    msg: `没有操作权限`
                }
            } else {
                await next();
            }
        } catch (err) {
            throw err
        }
    };
};