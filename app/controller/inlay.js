const Controller = require('egg').Controller;

class InlayController extends Controller {
    async findInlay() {
        await this.ctx.render('inlay/list.tpl');
    }
}
module.exports = InlayController;