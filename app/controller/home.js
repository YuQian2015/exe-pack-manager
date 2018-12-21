const Controller = require('egg').Controller;

class HomeController extends Controller {
  async home() {
    this.ctx.body = 'Hello world';
  }
}

module.exports = HomeController;