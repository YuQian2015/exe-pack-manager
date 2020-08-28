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
        const user = await ctx.service.wx.createVisitor(code);
        const token = ctx.app.jwt.sign({ id: user._id, role: 'wx' }, ctx.app.config.jwt.secret, {
            expiresIn: ctx.app.config.jwt.expiresIn
        });
        if (user) {
            ctx.body = {
                code: 200,
                data: { token },
                success: true,
                msg: ``
            };
        }
    }
}
module.exports = WxController;
