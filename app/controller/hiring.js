const Controller = require('egg').Controller;

const deleteRule = {
    id: 'string',
};

class HiringController extends Controller {
    async index() {
        const ctx = this.ctx;
        try {
            const hiringList = await ctx.service.hiring.findHiring(ctx.query);
            ctx.body = {
                code: 200,
                data: hiringList,
                success: true,
                msg: ``
            };
        }
        catch (err) {
            throw err;
        }
    }

    async search() {
        const ctx = this.ctx;
        try {
            const hiringList = await ctx.service.hiring.searchHiring(ctx.request.body);
            ctx.body = {
                code: 200,
                data: hiringList,
                success: true,
                msg: ``
            };
        }
        catch (err) {
            throw err;
        }
    }

    async update() {
        const ctx = this.ctx;
        ctx.validate(deleteRule, ctx.params);
        const result = await ctx.service.hiring.updateHiring({ _id: ctx.params.id }, ctx.request.body);
        if (result) {
            ctx.body = {
                code: 200,
                data: result,
                success: true,
                msg: `修改成功`
            }
        }
    }

    async report() {
        const ctx = this.ctx;
        const { startDate, endDate } = ctx.request.body;
        const result = await ctx.service.hiring.report({startDate, endDate});
        if (result) {
            ctx.body = {
                code: 200,
                data: result,
                success: true,
                msg: ``
            }
        }
    }
}
module.exports = HiringController;