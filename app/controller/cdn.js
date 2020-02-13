const Controller = require('egg').Controller;
// 定义删除接口的请求参数规则
const deleteRule = {
    id: 'string',
};
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

    async destroy() {
        const ctx = this.ctx;
        ctx.validate(deleteRule, ctx.params);
        const result = await this.ctx.service.cdn.deleteCdn(ctx.params.id);
        if (result.ok) {
            ctx.body = {
                code: 200,
                data: {},
                success: true,
                msg: `删除成功`
            }
        }
    }

    async getVersion() {
        const ctx = this.ctx;
        const result = await this.ctx.service.cdn.downloadHtml(ctx.params.id);
        if(result) {
            ctx.body = {
                code: 200,
                data: result,
                success: true,
                msg: ``
            }
        }
    }

    async publishCdn() {
        const ctx = this.ctx;
        const result = await this.ctx.service.cdn.publishCdn(ctx.params.id);
        if(result) {
            ctx.body = {
                code: 200,
                data: result,
                success: true,
                msg: ``
            }
        }
    }
}
module.exports = CdnController;