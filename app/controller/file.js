const Controller = require('egg').Controller;

class FileController extends Controller {
    async findFile() {
        await this.ctx.render('file/list.tpl');
    }
}
module.exports = FileController;