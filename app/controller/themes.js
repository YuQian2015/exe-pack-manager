const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
    brand: 'string',
    primary: 'string',
    secondary: 'string'
};

// 定义删除接口的请求参数规则
const deleteRule = {
    id: 'string',
};

class ThemesController extends Controller {

    async create() {
        const ctx = this.ctx;
        ctx.validate(createRule, ctx.request.body);
        try {
            const newTheme = await ctx.service.theme.createTheme(ctx.request.body);
            ctx.body = {
                code: 200,
                data: newTheme,
                success: true,
                msg: ``
            };
            console.log(newTheme);
        }
        catch (err) {
            throw err;
        }

    };


    async update() {
        const ctx = this.ctx;
        ctx.validate(deleteRule, ctx.params);
        const result = await this.ctx.service.theme.updateOneTheme({_id: ctx.params.id}, ctx.request.body);
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
        const result = await this.ctx.service.theme.deleteTheme(ctx.params.id);
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
module.exports = ThemesController;
