const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
    tenantId: 'string',
    colors: 'object',
};

// 定义删除接口的请求参数规则
const deleteRule = {
    id: 'string',
};

class ColorsController extends Controller {

    async index () {
        const ctx = this.ctx;
        try {
            const colors = await ctx.service.color.findColor();
            ctx.body = {
                code: 200,
                data: colors,
                success: true,
                msg: ``
            };
            console.log(colors);
        }
        catch (err) {
            throw err;
        }
    }

    async create() {
        const ctx = this.ctx;
        ctx.validate(createRule, ctx.request.body);
        try {
            let data = ctx.request.body;
            const color = await ctx.service.color.findOneColor({tenantId: ctx.request.body.tenantId});
            const tenant = await ctx.service.tenant.findOneTenant({tenantId: ctx.request.body.tenantId});
            data.tenantInfo = tenant._id;
            let newColor;
            if(color) {
                newColor = await ctx.service.color.updateOneColor({tenantId: ctx.request.body.tenantId}, data);
            } else {
                newColor = await ctx.service.color.createColor(ctx.request.body);
            }
            ctx.body = {
                code: 200,
                data: newColor,
                success: true,
                msg: ``
            };
            console.log(newColor);
        }
        catch (err) {
            throw err;
        }

    };


    async update() {
        const ctx = this.ctx;
        ctx.validate(deleteRule, ctx.params);
        const result = await this.ctx.service.color.updateOneColor({_id: ctx.params.id}, ctx.request.body);
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
        const result = await this.ctx.service.color.deleteColor(ctx.params.id);
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
module.exports = ColorsController;
