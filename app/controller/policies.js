const Controller = require('egg').Controller;
// 定义创建接口的请求参数规则
const createRule = {
    policy: 'array'
};
// 定义删除接口的请求参数规则
const deleteRule = {
    id: 'string',
};
class PoliciesController extends Controller {

    async index() {
        const ctx = this.ctx;
        try {
            ctx.body = {
                code: 200,
                data: ctx.app.enforcer.getPolicy(),
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
        ctx.validate(createRule, ctx.request.body);
        try {
            const newPolicy = await ctx.app.enforcer.addPolicy(...ctx.request.body.policy);
            if(newPolicy) {
                ctx.body = {
                    code: 200,
                    data: newPolicy,
                    success: true,
                    msg: ``
                };
            } else {
                throw new Error('新增协议失败');
            }
        }
        catch (err) {
            throw err;
        }

    };

    async update() {
        const ctx = this.ctx;
        ctx.validate(deleteRule, ctx.params);
        const result = await this.ctx.service.role.updateOneRole({_id: ctx.params.id}, ctx.request.body);
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
        const result = await ctx.app.enforcer.removePolicy(...ctx.params.id.replace(/11111/g,'/').replace('22222',/\*/g).split('00000'));
        if(result) {
            ctx.body = {
                code: 200,
                data: {},
                success: true,
                msg: `删除成功`
            }
        }
    }
}
module.exports = PoliciesController;
