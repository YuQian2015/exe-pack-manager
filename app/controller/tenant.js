const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  title: 'string',
  content: 'string',
};

class TenantController extends Controller {
  async addTenant() {
    await this.ctx.render('tenant/add.tpl');
  }


  async createTenant() {
    const newTenant = await this.ctx.service.tenant.createTenant(this.ctx.request.body);
    console.log(newTenant);
    await this.ctx.render('tenant/new.tpl', { tenant: newTenant });
  }

  async viewTenant() {
    const tenant = await this.ctx.service.tenant.findOneTenant({_id: this.ctx.params.id});
    await this.ctx.render('tenant/view.tpl', { tenant: tenant });
  }

  async editTenant() {
    const tenant = await this.ctx.service.tenant.findOneTenant({_id: this.ctx.params.id});
    await this.ctx.render('tenant/edit.tpl', { tenant: tenant });
  }


  async findTenant() {
    console.log(this.ctx.state.user);
    const tenantList = await this.ctx.service.tenant.findTenant();
    await this.ctx.render('tenant/list.tpl', { list: tenantList });
  }
}

module.exports = TenantController;