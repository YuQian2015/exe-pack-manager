const Controller = require('egg').Controller;

class PackController extends Controller {
  
    async findTenant() {
      const tenantList = await this.ctx.service.pack.findTenant();
      console.log(tenantList)
      await this.ctx.render('pack/list.tpl', { list: tenantList });
    }
  }
  
  module.exports = PackController;