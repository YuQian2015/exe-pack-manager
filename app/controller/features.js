const Controller = require('egg').Controller;

class FeaturesController extends Controller {

    async index () {
        const ctx = this.ctx;
        try {
            const feature = await ctx.service.feature.findFeature({});
            ctx.body = {
                code: 200,
                data: feature,
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
            const newFeature = await ctx.service.feature.createFeature(ctx.request.body);
            ctx.body = {
                code: 200,
                data: newFeature,
                success: true,
                msg: ``
            };
            console.log(123)
            console.log(newFeature);
        }
        catch (err) {
            throw err;
        }
    }
}
module.exports = FeaturesController;