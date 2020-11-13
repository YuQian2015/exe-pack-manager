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
        const data = await ctx.service.wx.createVisitor(code);
        if (data.token) {
            ctx.body = {
                code: 200,
                data,
                success: true,
                msg: ``
            };
        }
    }

    async login() {
        const ctx = this.ctx;
        const user = await ctx.service.wx.loginWxUser(ctx.request.body);
        if (user) {
            ctx.body = {
                code: 200,
                data: user,
                success: true,
                msg: ``
            };
        }
    }

    async valid() {
        const ctx = this.ctx;
        const user = await ctx.service.wx.validateUser();
        if (user) {
            ctx.body = {
                code: 200,
                data: user,
                success: true,
                msg: ``
            };
        }
    }
}
module.exports = WxController;
