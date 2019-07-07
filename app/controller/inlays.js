const Controller = require('egg').Controller;

class InlaysController extends Controller {

    async index() {
        const ctx = this.ctx;
        try {
            const inlayList = await ctx.service.inlay.findInlay(ctx.query);
            ctx.body = {
                code: 200,
                data: inlayList,
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
        try {
            const newInlay = await ctx.service.inlay.createInlay(ctx.request.body);
            ctx.body = {
                code: 200,
                data: newInlay,
                success: true,
                msg: ``
            };
            console.log(newInlay);
        }
        catch (err) {
            throw err;
        }

    };
}
module.exports = InlaysController;