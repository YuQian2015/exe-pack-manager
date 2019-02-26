const Controller = require('egg').Controller;

// 定义删除接口的请求参数规则
const deleteRule = {
    id: 'string',
};

class TenantsController extends Controller {

    async index() {
        const ctx = this.ctx;
        try {
            const tenants = await ctx.service.tenant.findTenant(ctx.query);
            ctx.body = {
                code: 200,
                data: tenants,
                success: true,
                msg: ``
            };
        } catch (err) {
            throw err;
        }
    }

    async update() {
        const ctx = this.ctx;
        ctx.validate(deleteRule, ctx.params);
        const result = await this.ctx.service.tenant.updateOneTenant({_id: ctx.params.id}, ctx.request.body);
        if (result.ok) {
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
        const result = await this.ctx.service.tenant.deleteTenant(ctx.params.id);
        if (result.ok) {
            ctx.body = {
                code: 200,
                data: {},
                success: true,
                msg: `删除成功`
            }
        }
    }
}

module.exports = TenantsController;
