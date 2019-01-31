const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
    name: 'string'
};

// 定义删除接口的请求参数规则
const deleteRule = {
    id: 'string',
};

class RolesController extends Controller {

    async index() {
        const ctx = this.ctx;
        try {
            const roleList = await ctx.service.role.findRole(ctx.query);
            ctx.body = {
                code: 200,
                data: roleList,
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
            const role = await ctx.service.role.findOneRole(ctx.request.body);
            if(role) {
               throw new Error('角色已经存在')
            }
            const newRole = await ctx.service.role.createRole(ctx.request.body);
            ctx.body = {
                code: 200,
                data: newRole,
                success: true,
                msg: ``
            };
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
        const result = await this.ctx.service.role.deleteRole(ctx.params.id);
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
module.exports = RolesController;