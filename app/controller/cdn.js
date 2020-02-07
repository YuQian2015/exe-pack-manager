const Controller = require('egg').Controller;

class CdnController extends Controller {
    async findCDN() {
        await this.ctx.render('cdn/list.tpl');
    }

    async index() {
        const { ctx } = this
        try {
            const cdn = await ctx.service.cdn.findCdn();
            ctx.body = {
                code: 200,
                data: cdn,
                success: true,
                msg: ``
            };
        } catch (e) {
            throw e
        }
    }

    async create() {
        const { ctx } = this
        const data = ctx.request.body;
        try {
            const newCdn = await ctx.service.cdn.createCdn(data);
            ctx.body = {
                code: 200,
                data: newCdn,
                success: true,
                msg: ``
            };
        } catch (e) {
            throw e
        }
    }
}
module.exports = CdnController;