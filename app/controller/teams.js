const Controller = require('egg').Controller;
class TeamsController extends Controller {

    async index() {
        const ctx = this.ctx;
        try {
            const teams = await ctx.service.team.findTeam(ctx.query);
            ctx.body = {
                code: 200,
                data: teams,
                success: true,
                msg: ``
            };
        } catch (err) {
            throw err;
        }
    }

    async create() {
        const ctx = this.ctx;
        try {
            const newTeam = await ctx.service.team.createTeam(ctx.request.body);
            ctx.body = {
                code: 200,
                data: newTeam,
                success: true,
                msg: ``
            };
            console.log(newTeam);
        }
        catch (err) {
            throw err;
        }
    };
}

module.exports = TeamsController;
