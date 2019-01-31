const Controller = require('egg').Controller;

class ManagementController extends Controller {
    async findManagement() {
        await this.ctx.render('management/list.tpl');
    }
}
module.exports = ManagementController;