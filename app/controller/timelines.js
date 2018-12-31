const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
    content: 'string',
};

// 定义删除接口的请求参数规则
const deleteRule = {
    id: 'string',
};

class TimelinesController extends Controller {

    async index () {
        const ctx = this.ctx;
        try {
            const timeline = await ctx.service.timeline.findTimeline({tenantKey: ctx.query.tenantKey});
            ctx.body = {
                code: 200,
                data: timeline,
                success: true,
                msg: ``
            };
            console.log(timeline);
        }
        catch (err) {
            throw err;
        }
    }

    async create() {
        const ctx = this.ctx;
        ctx.validate(createRule, ctx.request.body);
        try {
            const newTimeline = await ctx.service.timeline.createTimeline(ctx.request.body);
            ctx.body = {
                code: 200,
                data: newTimeline,
                success: true,
                msg: ``
            };
            console.log(newTimeline);
        }
        catch (err) {
            throw err;
        }

    };


    async update() {
        const ctx = this.ctx;
        ctx.validate(deleteRule, ctx.params);
        const result = await this.ctx.service.timeline.updateOneTimeline({_id: ctx.params.id}, ctx.request.body);
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
        const result = await this.ctx.service.timeline.deleteTimeline(ctx.params.id);
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
module.exports = TimelinesController;
