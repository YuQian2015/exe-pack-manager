const Controller = require('egg').Controller;

class HomeController extends Controller {
  async home() {
    this.ctx.body = 'Hello world';
  }
  async login() {
    await this.ctx.render('home/login.tpl');
  }
}

module.exports = HomeController;