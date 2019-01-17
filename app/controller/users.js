const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
    tel: 'string',
    password: 'string',
};

// 定义删除接口的请求参数规则
const deleteRule = {
    id: 'string',
};

class UsersController extends Controller {

    async index () {
        const ctx = this.ctx;
        try {
            const user = await ctx.service.user.findUser({tenantKey: ctx.query.tenantKey});
            ctx.body = {
                code: 200,
                data: user,
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
            const user = await ctx.service.user.findOneUser({tel: ctx.request.body.tel});
            if(user) {
                throw new Error('该手机号已经注册过用户');
            }
            const newUser = await ctx.service.user.createUser(ctx.request.body);
            ctx.body = {
                code: 200,
                data: newUser,
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
        const result = await this.ctx.service.user.updateOneUser({_id: ctx.params.id}, ctx.request.body);
        if(result.ok) {
            ctx.body = {
                code: 200,
                data: {},
                success: true,
                msg: `修改成功`
            }
        }
    }
}
module.exports = UsersController;
