const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
    name: 'string',
    type: 'number'
};

// 定义删除接口的请求参数规则
const deleteRule = {
    id: 'string',
};

class KeepersController extends Controller {

    async index() {
        const ctx = this.ctx;
        try {
            const keeperList = await ctx.service.keeper.findKeeper(ctx.query);
            ctx.body = {
                code: 200,
                data: keeperList,
                success: true,
                msg: ``
            };
        }
        catch (err) {
            throw err;
        }
    }

    async create() {
        const ctx = this.ctx;
        ctx.validate(createRule, ctx.request.body);
        try {
            const newKeeper = await ctx.service.keeper.createKeeper(ctx.request.body);
            ctx.body = {
                code: 200,
                data: newKeeper,
                success: true,
                msg: ``
            };
            console.log(newKeeper);
        }
        catch (err) {
            throw err;
        }

    };

    // 删除租户的方法
    async destroy() {
        const ctx = this.ctx;
        ctx.validate(deleteRule, ctx.params);
        const result = await this.ctx.service.keeper.deleteKeeper(ctx.params.id);
        if(result.ok) {
            ctx.body = {
                code: 200,
                data: {},
                success: true,
                msg: `删除成功`
            }
        }
    }
}
module.exports = KeepersController;