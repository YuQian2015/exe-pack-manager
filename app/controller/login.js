const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
    tel: 'string',
    password: 'string',
};

class LoginController extends Controller {

    async create() {
        const ctx = this.ctx;
        ctx.validate(createRule, ctx.request.body);
        try {
            const user = await ctx.service.user.findOneUser({tel: ctx.request.body.tel, password: ctx.request.body.password});
            if(user) {
                const token = ctx.app.jwt.sign({ userId: user._id }, ctx.app.config.jwt.secret, {
                    expiresIn: ctx.app.config.jwt.expiresIn
                });
                ctx.cookies.set('token', token);
                ctx.body = {
                    code: 200,
                    data: {
                        user, token
                    },
                    success: true,
                    msg: ``
                };
            } else {
                throw new Error('用户或者密码不正确');
            }
        }
        catch (err) {
            throw err;
        }

    };
}
module.exports = LoginController;
