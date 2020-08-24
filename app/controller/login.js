const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
    userId: 'string',
    password: 'string',
};

// 定义创建接口的请求参数规则
const qrRule = {
    qrApplyId: 'string',
    ticket: 'string',
};

class LoginController extends Controller {
    async index () {
        const ctx = this.ctx;
        ctx.validate(qrRule, ctx.query);
        const user = await ctx.service.login.loginWithExeQrCode(ctx.query);
        if(user) {
            console.log(user);
            ctx.cookies.set('token', user.token);
            ctx.body = {
                code: 200,
                data: user,
                success: true,
                msg: ``
            };
        }
    }

    async create() {
        const ctx = this.ctx;
        ctx.validate(createRule, ctx.request.body);
        let {userId, password} = ctx.request.body;
        try {
            const user = await ctx.service.user.findOneUser({password, userId});
            if(user) {
                console.log(user);
                let role = 'visitor';
                if(user.role) {
                    role = user.role.name;
                }
                const token = ctx.app.jwt.sign({ id: user._id, role: role }, ctx.app.config.jwt.secret, {
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

    // 其他接口
    async logout() {
        const ctx = this.ctx;
        ctx.cookies.set('token', null);
        ctx.body = {
            code: 200,
            data: {},
            success: true,
            msg: `退出登录`
        }
    }
}
module.exports = LoginController;
