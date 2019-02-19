const Controller = require('egg').Controller;

class NativeController extends Controller {
    async findNative() {
        await this.ctx.render('native/list.tpl');
    }
}
module.exports = NativeController;