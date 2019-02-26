const Controller = require('egg').Controller;

class PackController extends Controller {
  
    async findTenant() {
      const tenantList = await this.ctx.service.pack.findTenant();
      await this.ctx.render('pack/pack.tpl', { list: tenantList });
    }


    async findPack() {
        const packList = await this.ctx.service.pack.findPack();
        await this.ctx.render('pack/list.tpl', { list: packList });
    }

    async findHistory() {
        await this.ctx.render('pack/history.tpl');
    }

    async findPackTenant() {
        const ctx = this.ctx;
        try {
            const tenantList = await ctx.service.pack.findTenant(ctx.query);
            ctx.body = {
                code: 200,
                data: tenantList,
                success: true,
                msg: ``
            };
        }
        catch (err) {
            throw err;
        }
    }
  }
  
  module.exports = PackController;