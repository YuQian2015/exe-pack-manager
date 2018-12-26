const Controller = require('egg').Controller;

class FilesController extends Controller {
    async index () {
        const ctx = this.ctx;
        try {
            const fileList = await ctx.service.file.findFile();
            ctx.body = {
                code: 200,
                data: fileList,
                success: true,
                msg: ``
            };
            console.log(fileList);
        }
        catch (err) {
            throw err;
        }
    }
}
module.exports = FilesController;