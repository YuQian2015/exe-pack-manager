const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
    type: 'number',
    tenants: 'array',
};

// 定义删除接口的请求参数规则
const deleteRule = {
    id: 'string',
};

class PacksController extends Controller {

    async create() {
        const ctx = this.ctx;
        ctx.validate(createRule, ctx.request.body);
        try {
            const newPack = await ctx.service.pack.createPack(ctx.request.body);
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

    async update() {
        const ctx = this.ctx;
        ctx.validate(deleteRule, ctx.params);
        const result = await this.ctx.service.pack.updateOnePack({_id: ctx.params.id}, ctx.request.body);
        if(result.ok) {
            ctx.body = {
                code: 200,
                data: {},
                success: true,
                msg: `修改成功`
            }
        }
    }


    // 删除租户的方法
    async destroy() {
        const ctx = this.ctx;
        ctx.validate(deleteRule, ctx.params);
        const result = await this.ctx.service.pack.deletePack(ctx.params.id);
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
module.exports = PacksController;