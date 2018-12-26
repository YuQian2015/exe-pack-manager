const Controller = require('egg').Controller;

class PackController extends Controller {
  
    async findTenant() {
      const tenantList = await this.ctx.service.pack.findTenant();
      console.log(tenantList)
      await this.ctx.render('pack/pack.tpl', { list: tenantList });
    }


    async findPack() {
        const packList = await this.ctx.service.pack.findPack();
        console.log(packList)
        await this.ctx.render('pack/list.tpl', { list: packList });
    }
  }
  
  module.exports = PackController;