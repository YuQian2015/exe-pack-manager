const Controller = require('egg').Controller;

class WxController extends Controller {
    async index() {
        const ctx = this.ctx;
        try {

        }
        catch (err) {
            throw err;
        }
    }

    async auth() {
        const ctx = this.ctx;
        const { code } = ctx.request.body;
        const token = await ctx.service.wx.createVisitor(code);
        if (token) {
            ctx.body = {
                code: 200,
                data: { token },
                success: true,
                msg: ``
            };
        }
    }

    async login() {
        const ctx = this.ctx;
        console.log(123123);
        const user = await ctx.service.wx.loginWxUser(ctx.request.body);
        if (user) {
            ctx.body = {
                code: 200,
                data: ``,
                success: true,
                msg: ``
            };
        }
    }
}
module.exports = WxController;
