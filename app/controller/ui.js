const Controller = require('egg').Controller;

class UiController extends Controller {
    async findUi() {
        await this.ctx.render('ui/list.tpl');
    }
}
module.exports = UiController;