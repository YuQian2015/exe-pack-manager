const Controller = require('egg').Controller;

class HiringController extends Controller {
    async index () {
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
}
module.exports = HiringController;