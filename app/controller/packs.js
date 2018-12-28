const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
    type: 'number',
    tenants: 'array',
};

class PacksController extends Controller {

    async create() {
        const ctx = this.ctx;
        ctx.validate(createRule, ctx.request.body);
        try {
            const newPack = await ctx.service.pack.updatePack(ctx.request.body);
            ctx.body = {
                code: 200,
                data: newPack,
                success: true,
                msg: ``
            };
            console.log(newPack);
        }
        catch (err) {
            throw err;
        }

    };
}
module.exports = PacksController;