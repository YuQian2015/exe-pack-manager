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
        try {
            const result = await ctx.curl(`https://sso.exexm.com/qrlogin.ashx?t=listen&v=2&qrApplyId=${ctx.query.qrApplyId}&ticket=${ctx.query.ticket}`, {
                dataType: 'json',
                timeout: 5000,
                method: 'POST',
                headers: {
                    "Accept-Language": 'zh-CN',
                },
                contentType: "application/json",
                data: JSON.stringify({qrApplyId: ctx.query.qrApplyId, version: 2})
            });

            if(result.data.code === 200) {
                console.log(result.data.ticket)
                console.log(ctx.query.ticket)
                console.log('-------------');
                if(result.data.ticket && result.data.ticket.replace("%2f","/").replace("%3f","?").replace("%2b","+").replace("%3d","=").replace
                ("%26","&") === ctx.query.ticket) {
                    console.log('1111')
                    const user = await ctx.service.user.findOneUser({userId: result.data.userId});
                    if(user) {
                        console.log('2222')
                        const token = ctx.app.jwt.sign({ id: user._id }, ctx.app.config.jwt.secret, {
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
                        console.log('33333')
                        try {
                            const newUser = await ctx.service.user.createUser({
                                name: result.data.name, // 姓名
                                userId: result.data.userId, // 用户Id
                                tenantId: result.data.tenantId, // 租户ID
                                password: 'e10adc3949ba59abbe56e057f20f883e', // 用户密码
                                createDate: new Date(), // 创建时间
                                updateDate: new Date(), // 修改时间
                            });
                            const token = ctx.app.jwt.sign({ id: user._id }, ctx.app.config.jwt.secret, {
                                expiresIn: ctx.app.config.jwt.expiresIn
                            });
                            ctx.cookies.set('token', token);
                            ctx.body = {
                                code: 200,
                                data: {
                                    user: newUser, token
                                },
                                success: true,
                                msg: ``
                            };
                        }
                        catch (err) {
                            throw err;
                        }
                    }
                } else {
                    throw new Error('扫码验证失败');
                }
            } else {
                throw new Error('扫码验证失败');
            }
        }
        catch (err) {
            throw err;
        }
    }

    async create() {
        const ctx = this.ctx;
        ctx.validate(createRule, ctx.request.body);
        let {userId, password} = ctx.request.body;
        try {
            const user = await ctx.service.user.findOneUser({password, userId});
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
