const Controller = require('egg').Controller;
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
