const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
    team: 'string',
    name: 'string',
    framework: 'number',
    demo: 'number',
    usability: 'number',
    performance: 'number'
};

class RateController extends Controller {

    async index() {
        const ctx = this.ctx;
        try {
            const rate = await ctx.service.rate.findRate(ctx.query);
            ctx.body = {
                code: 200,
                data: rate,
                success: true,
                msg: ``
            };
        } catch (err) {
            throw err;
        }
    }

    async create() {
        const ctx = this.ctx;
        ctx.validate(createRule, ctx.request.body);
        const rate = await ctx.service.rate.findRate({name: ctx.request.body.name, team: ctx.request.body.team});
        if(rate.length) {
            throw new Error('不能重复提交');
        }
        try {
            const newRate = await ctx.service.rate.createRate(ctx.request.body);
            ctx.body = {
                code: 200,
                data: newRate,
                success: true,
                msg: ``
            };
            console.log(newRate);
        }
        catch (err) {
            throw err;
        }
    };
}

module.exports = RateController;
