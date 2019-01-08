const Controller = require('egg').Controller;

// 定义删除接口的请求参数规则
const findRule = {
    type: 'string',
};

class AutoPacksController extends Controller {
    async index () {
        const ctx = this.ctx;
        ctx.validate(findRule, ctx.query);
        try {
            const colors = await ctx.service.pack.findAutoPack(ctx.query);
            ctx.body = {
                code: 200,
                data: colors,
                success: true,
                msg: ``
            };
            console.log(colors);
        }
        catch (err) {
            throw err;
        }
    }
}
module.exports = AutoPacksController;